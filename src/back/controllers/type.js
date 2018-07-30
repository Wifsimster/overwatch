const Type = require('../models/type')

module.exports = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  update: update,
  destroy: destroy
}

function findAll(parameters = { orderBy: 'updatedAt' }) {
  return Type.findAll({
    order: [parameters.orderBy.split(' ')]
  })
}

function findOne(parameters) {
  return Type.findById(parameters.id)
}

function create() {}

function update(parameters) {
  return new Promise((resolve, reject) => {
    Type.findById(parameters.id)
      .then(device => {
        device
          .update({
            name: parameters.name,
            key: parameters.key
          })
          .then(() => {
            Type.findById(parameters.id)
              .then(data => {
                resolve(data)
              })
              .catch(err => {
                reject(err)
              })
          })
          .catch(err => {
            reject(err)
          })
      })
      .catch(err => {
        reject(err)
      })
  })
}

function destroy() {
  return Type.destroy({ where: parameters })
}
