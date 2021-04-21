module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: true } }]
  ],
  plugins: [
    "lodash",
    "@vue/babel-plugin-jsx"
  ],
  env: {
    utils: {
      "presets": [
        ["@babel/preset-env", {
          "modules": "cjs"
        }]
      ]
    }
  }
}