// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const rules = webpackConfig.module.rules.find((rule) => Array.isArray(rule.oneOf)).oneOf;

      rules.forEach((rule) => {
        if (rule && rule.resolve && rule.resolve.fullySpecified !== undefined) {
          // disable fullySpecified for all JS in node_modules
          rule.resolve.fullySpecified = false;
        }
      });

      return webpackConfig;
    },
  },
};