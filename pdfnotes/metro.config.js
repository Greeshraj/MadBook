const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: [...assetExts, 'jpg', 'png', 'jpeg', 'gif', 'svg'], // Include 'svg' in assetExts
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
