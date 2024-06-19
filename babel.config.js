module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: true,
          regenerator: true
        }
      ],
      '@babel/plugin-transform-export-namespace-from',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            assets: './assets',
            src: './src',
            '@env': './.env'
          }
        }
      ],
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic'
        }
      ]
    ]
  }
}
