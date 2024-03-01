module.exports = {
  presets: [
      [
    '@vue/cli-plugin-babel/preset',
    { useBuiltIns: 'entry', modules: 'commonjs' }
    ]
  ],
  plugins: [
    // ant-design-vue按需加载配置-
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' },
      'ant-design-vue'
    ],
    // lodash按需加载配置-
    'lodash'
  ]
}
