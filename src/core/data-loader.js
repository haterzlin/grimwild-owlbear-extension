export const loadExternalData = async ({
  pathKeys = [],
  backgroundUrl = "/data/background-talents.json",
  pathDetailsUrl = "/data/path-details.json",
  pathsBaseUrl = "/data/paths"
} = {}) => {
  const pathResponses = await Promise.all(pathKeys.map(async pathKey => {
    try {
      const response = await fetch(`${pathsBaseUrl}/${pathKey}.json`);
      if (!response.ok) return [ pathKey, null ];
      const parsedPath = await response.json();
      return [ pathKey, parsedPath ];
    } catch {
      return [ pathKey, null ];
    }
  }));

  const paths = Object.fromEntries(pathResponses.filter(([, pathData]) => pathData && typeof pathData === "object"));
  try {
    const response = await fetch(pathDetailsUrl);
    if (response.ok) {
      const detailsByPath = await response.json();
      for (const [pathKey, details] of Object.entries(detailsByPath)) {
        if (paths[pathKey] && Array.isArray(details)) paths[pathKey] = { ...paths[pathKey], details };
      }
    }
  } catch {}
  let backgroundTalents = [];
  try {
    const response = await fetch(backgroundUrl);
    if (response.ok) {
      const parsed = await response.json();
      if (Array.isArray(parsed)) backgroundTalents = parsed;
    }
  } catch {}

  return {
    paths,
    backgroundTalents
  };
};
