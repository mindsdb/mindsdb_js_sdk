module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 1%, not dead, node > 10"
    }]
  ],
  "plugins": [
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "@babel/plugin-transform-runtime"
  ]
}