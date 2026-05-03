import { CHAT_METADATA_KEY } from "../core/metadata.js";

export const getPathIds = pathsById => Object.keys(pathsById ?? {});

export const getPathData = (pathsById, pathId) => {
  if (!pathId) return null;
  return pathsById?.[pathId] ?? null;
};

const getTrackerNameKey = tracker => String(tracker?.name ?? "").trim().toLowerCase();

const initializeTracker = tracker => {
  if (!tracker || typeof tracker !== "object") return tracker;

  const nextTracker = {
    ...tracker
  };

  switch (tracker.type) {
    case "checkbox":
      nextTracker.checked = Boolean(tracker.checked ?? tracker.value ?? false);
      break;
    case "field":
    case "fieldSmall":
    case "fieldSmallLong":
      nextTracker.value1 = tracker.value1 ?? tracker.value ?? "";
      break;
    case "fieldTwo":
      nextTracker.value1 = tracker.value1 ?? tracker.value ?? "";
      nextTracker.value2 = tracker.value2 ?? "";
      break;
    default:
      break;
  }

  return nextTracker;
};

export const initializeTalent = talent => {
  if (!talent || typeof talent !== "object") return talent;

  return {
    ...talent,
    trackers: Array.isArray(talent.trackers) ? talent.trackers.map(initializeTracker) : talent.trackers
  };
};

const normalizeTrackersFromTemplate = (templateTrackers, storedTrackers) => {
  if (!Array.isArray(templateTrackers)) return undefined;

  const sourceTrackers = Array.isArray(storedTrackers) ? storedTrackers : [];
  const namedTrackerIndexes = new Map();
  sourceTrackers.forEach((tracker, index) => {
    const key = getTrackerNameKey(tracker);
    if (!key) return;
    if (!namedTrackerIndexes.has(key)) namedTrackerIndexes.set(key, []);
    namedTrackerIndexes.get(key).push(index);
  });

  const usedIndexes = new Set();

  return templateTrackers.map((templateTracker, trackerIndex) => {
    const key = getTrackerNameKey(templateTracker);
    let matchedIndex = -1;

    if (key && namedTrackerIndexes.has(key)) {
      matchedIndex = namedTrackerIndexes.get(key).find(index => !usedIndexes.has(index)) ?? -1;
    }

    if (matchedIndex < 0 && trackerIndex < sourceTrackers.length && !usedIndexes.has(trackerIndex)) {
      matchedIndex = trackerIndex;
    }

    if (matchedIndex < 0) {
      matchedIndex = sourceTrackers.findIndex((_, index) => !usedIndexes.has(index));
    }

    const storedTracker = matchedIndex >= 0 ? sourceTrackers[matchedIndex] : null;
    if (matchedIndex >= 0) usedIndexes.add(matchedIndex);

    return initializeTracker({
      ...templateTracker,
      ...(templateTracker.type === "checkbox" ? {
        checked: storedTracker?.checked ?? storedTracker?.value ?? false
      } : {}),
      ...((templateTracker.type === "field" || templateTracker.type === "fieldSmall" || templateTracker.type === "fieldSmallLong") ? {
        value1: storedTracker?.value1 ?? storedTracker?.value ?? ""
      } : {}),
      ...(templateTracker.type === "fieldTwo" ? {
        value1: storedTracker?.value1 ?? storedTracker?.value ?? "",
        value2: storedTracker?.value2 ?? ""
      } : {})
    });
  });
};

export const normalizeTalentFromTemplate = (templateTalent, storedTalent) => {
  if (!templateTalent || typeof templateTalent !== "object") return initializeTalent(storedTalent);

  const normalizedTemplate = initializeTalent(templateTalent);
  if (!storedTalent || typeof storedTalent !== "object") return normalizedTemplate;

  return {
    ...normalizedTemplate,
    trackers: normalizeTrackersFromTemplate(normalizedTemplate.trackers, storedTalent.trackers)
  };
};

const buildTalentLookup = pathsById => {
  const lookup = {};
  Object.values(pathsById ?? {}).forEach(pathData => {
    pathData?.pathTalent?.forEach(talent => {
      if (talent?.name) lookup[talent.name] = talent;
    });
  });
  return lookup;
};

export const normalizeCharacterForRules = (character, pathsById) => {
  if (!character || typeof character !== "object") return character;

  const pathData = getPathData(pathsById, character.path);
  const talentLookup = buildTalentLookup(pathsById);

  return {
    ...character,
    coreTalent: pathData?.coreTalent
      ? normalizeTalentFromTemplate(pathData.coreTalent, character.coreTalent)
      : initializeTalent(character.coreTalent),
    talents: Array.isArray(character.talents)
      ? character.talents.map(talent => {
          const templateTalent = talent?.name ? talentLookup[talent.name] ?? null : null;
          return templateTalent ? normalizeTalentFromTemplate(templateTalent, talent) : initializeTalent(talent);
        })
      : []
  };
};

export const assignCorePath = (player, pathId, pathsById) => {
  const pathData = pathId ? pathsById?.[pathId] ?? null : null;
  return {
    ...player,
    path: pathId,
    coreTalent: pathData ? initializeTalent(pathData.coreTalent) : null
  };
};

export const clearCorePath = player => ({
  ...player,
  path: "",
  coreTalent: null
});

export const updateCoreTalentTracker = (player, tracker, trackerIndex) => {
  const coreTalent = player.coreTalent;
  if (!coreTalent?.trackers) return player;

  const nextTrackers = [ ...coreTalent.trackers ];
  nextTrackers[trackerIndex] = tracker;

  return {
    ...player,
    coreTalent: {
      ...coreTalent,
      trackers: nextTrackers
    }
  };
};

export const addTalentToCharacter = (player, talent) => ({
  ...player,
  talents: [ ...player.talents, initializeTalent(talent) ]
});

export const removeTalentAtIndex = (player, talentIndex) => ({
  ...player,
  talents: player.talents.filter((_, index) => index !== talentIndex)
});

export const updateTalentTrackerAtIndex = (player, talentIndex, tracker, trackerIndex) => ({
  ...player,
  talents: player.talents.map((talent, index) => {
    if (index !== talentIndex || !talent?.trackers) return talent;

    const nextTrackers = [ ...talent.trackers ];
    nextTrackers[trackerIndex] = tracker;

    return {
      ...talent,
      trackers: nextTrackers
    };
  })
});

export const buildTalentBroadcastEntry = talent => ({
  id: Date.now(),
  user: talent.name,
  description: talent.description
});

export const buildTalentBroadcastPatch = ({ metadata, ownPlayerId, myChatEntries, talent }) => {
  const chatRecord = {
    ...(metadata?.[CHAT_METADATA_KEY] ?? {})
  };
  chatRecord[ownPlayerId] = [ ...myChatEntries, buildTalentBroadcastEntry(talent) ];

  return {
    [CHAT_METADATA_KEY]: chatRecord
  };
};
