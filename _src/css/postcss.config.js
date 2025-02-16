module.exports = {  
  plugins: {
    'postcss-import': {},
    'postcss-nesting':{
      silenceAtNestWarning: true, 
      noIsPseudoSelector: true,
      edition:'2021'
    },
    'postcss-preset-env': {
      stage: 1,
      features: {        
         'nesting-rules': true,
        'custom-media-queries': true
      },
      preserve: false
    },
    'cssnano': {}
  }
}
