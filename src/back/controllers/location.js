const Location = require('../models/location')

module.exports = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  update: update,
  destroy: destroy
}

function findAll(parameters = { orderBy: 'updatedAt' }) {
  return Location.findAll({
    order: [parameters.orderBy.split(' ')]
  })
}

function findOne(parameters) {
  return Location.findById(parameters.id)
}

function create(parameters) {
  return new Promise((resolve, reject) => {
    Location.findOne({
      where: {
        name: parameters.name
      }
    })
      .then(location => {
        if (location) {
          reject('Name already exists !')
        } else {
          Location.create(parameters).then(data => {
            resolve(data)
          })
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

function update(parameters) {
  return new Promise((resolve, reject) => {
    Location.findById(parameters.id)
      .then(location => {
        location
          .update({
            name: parameters.name
          })
          .then(() => {
            Location.findById(parameters.id)
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

function destroy(parameters) {
  return Location.destroy({ where: parameters })
}
