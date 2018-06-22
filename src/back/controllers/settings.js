const jsonfile = require('jsonfile')
const file = 'config/default.json'
jsonfile.spaces = 2

module.exports = {
  findAll: findAll,
  findOne: findOne,
  update: update,
  update: update,
  destroy: destroy
}

function findAll() {
  return jsonfile.readFileSync(file)
}

function findOne() {}

function create() {}

function update(settings) {
  return jsonfile.writeFile(file, { settings: settings })
}

function destroy() {}
