const Device = require('../models/device')
const Type = require('../models/type')
const Location = require('../models/location')
const Message = require('../models/message')

module.exports = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  update: update,
  destroy: destroy
}

function findAll() {
  return Device.findAll({
    include: [Type, Location]
  })
}

function findOne(parameters = {}) {
  return Device.findById(parameters.id, {
    include: [Type, Location, Message]
  })
}

function create() {}

function update(parameters) {
  return new Promise((resolve, reject) => {
    Device.findById(parameters.id).then(device => {
      device.update({
        name: parameters.name,
        mac: parameters.mac,
        ip: parameters.ip,
        locationId: parameters.location.id
      }).then(() => {
        device.setTypes(parameters.types.map(type => type.id)).then(() => {
          Device.findById(parameters.id, {
            include: [Type, Location, Message]
          }).then(data => {
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
        reject(err)
    })
  })
}

function destroy(parameters) {
  return Device.destroy({
    where: { id: parameters.id }
  })
}
