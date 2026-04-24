import { CHAT_METADATA_KEY } from "../core/metadata.js";

export const getPathIds = pathsById => Object.keys(pathsById ?? {});

export const getPathData = (pathsById, pathId) => {
  if (!pathId) return null;
  return pathsById?.[pathId] ?? null;
};

export const assignCorePath = (player, pathId, pathsById) => {
  const pathData = pathId ? pathsById?.[pathId] ?? null : null;
  return {
    ...player,
    path: pathId,
    coreTalent: pathData ? pathData.coreTalent : null
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
  talents: [ ...player.talents, talent ]
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
