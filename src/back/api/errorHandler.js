module.exports = function(err) {
  return { error: true, name: err.name, message: err.message, parent: err.parent }
}