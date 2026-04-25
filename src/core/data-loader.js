export const loadExternalData = async ({
  pathKeys = [],
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

  return {
    paths
  };
};
