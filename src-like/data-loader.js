// Transitional compatibility module.
// New maintained runtime work should go into src/core or src/domain instead.
export const loadExternalData = async ({
  currentPaths = {},
  assetsUrl = "/data/assets.json",
  pathsBaseUrl = "/data/paths"
} = {}) => {
  let assets = null;

  const assetsResponse = await fetch(assetsUrl);
  if (assetsResponse.ok) {
    const parsedAssets = await assetsResponse.json();
    if (parsedAssets && typeof parsedAssets === "object") assets = parsedAssets;
  }

  const pathKeys = assets && typeof assets === "object" ? Object.keys(assets) : Object.keys(currentPaths);
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
    assets,
    paths
  };
};
