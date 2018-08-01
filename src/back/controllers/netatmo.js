const netatmo = require('netatmo')
const config = require('../../../config/default.json')

const auth = config.settings.netatmo

const api = new netatmo(auth)

module.exports = {
  findAll: findAll
}

function findAll() {
  return new Promise((resolve, reject) => {
    api.getStationsData(function(err, data) {
      resolve(data)
    })
  })
}
