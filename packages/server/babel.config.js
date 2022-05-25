module.exports = function (api) {
  api.cache(true);

  const presets = ["@babel/env", "@babel/preset-typescript"];
  const plugins = [
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        root: ["./src/"],
        alias: {
          "@clients": "clients/*",
          "@service": "service/*",
          "@middleware": "middleware/*",
          "@resolvers": "resolvers/*",
          "@schema": "schema/*",
          "@types": "types/*",
          "@utils": "utils/*",
        },
        extensions: [".js", ".ts"],
      },
    ],
    require.resolve("babel-plugin-transform-typescript-metadata"),
    [
      require.resolve("@babel/plugin-proposal-decorators"),
      {
        legacy: true,
      },
    ],
    [
      require.resolve("@babel/plugin-proposal-class-properties"),
      {
        loose: true,
      },
    ],
    require.resolve("@babel/proposal-object-rest-spread"),
  ];

  return {
    presets,
    plugins,
  };
};
