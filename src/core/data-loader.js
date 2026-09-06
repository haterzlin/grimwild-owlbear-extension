export const loadExternalData = async ({
  pathKeys = [],
  backgroundUrl = "/data/background-talents.json",
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
