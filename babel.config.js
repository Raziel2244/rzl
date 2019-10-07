module.exports = api => {
  const isTest = api.env('test');
  api.cache(true);

  const testPresets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ]
  ];


  const presets = (isTest) ? testPresets : ["@babel/preset-env"];
  const plugins = [];

  return {
    presets,
    plugins
  };
};
