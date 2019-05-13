module.exports = {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            browsers: ['ie >= 11']
          }
        }
      ]
    ],
    // "plugins": [
    //   ["@babel/plugin-proposal-class-properties", { "loose": false }],
    //   "@babel/plugin-transform-runtime"
    // ]
  }