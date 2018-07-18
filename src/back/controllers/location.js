const Location = require('../models/location')

module.exports = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  update: update,
  destroy: destroy
}

function findAll() {
  return Location.findAll()
}

function findOne() {}

function create() {}

function update() {}

function destroy() {}
