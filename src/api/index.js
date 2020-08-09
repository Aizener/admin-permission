const context = require.context('./', false, /.js$/)

const modules = {}
context.keys().forEach(fileName => {
  if (!['./index.js', './http.js'].includes(fileName)) {
    Object.assign(modules, context(fileName))
  }
})

export default modules