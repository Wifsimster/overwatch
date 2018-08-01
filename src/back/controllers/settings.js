const jsonfile = require('jsonfile')
const file = 'config/default.json'
jsonfile.spaces = 2

module.exports = {
  findAll: findAll,
  update: update
}

function findAll() {
  return new Promise((resolve, reject) => {
    const data = jsonfile.readFileSync(file)
    resolve(data.settings)
  })
}

function update(parameters) {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(file, { settings: parameters })
    resolve()
  })
}
