// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: false,
    }],
    'indent': ['error', 2, {
      SwitchCase: 1,
      ignoredNodes: ['TemplateLiteral'],
    }],
  },
})
