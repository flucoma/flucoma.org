module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': true,
        'custom-media-queries': true
      },
      preserve: false
    },
    'cssnano': {}
  }
}
