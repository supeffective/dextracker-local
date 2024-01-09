const OpenProps = require('open-props')
const importGlob = require('postcss-import-ext-glob')
const postcssImport = require('postcss-import')
const postcssJitProps = require('postcss-jit-props')
const combineSelectors = require('postcss-combine-duplicated-selectors')
const cssnano = require('cssnano')

module.exports = {
  plugins: [importGlob(), postcssImport(), postcssJitProps(OpenProps), combineSelectors(), cssnano()],
}
