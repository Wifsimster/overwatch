const Type = require('../models/type')

module.exports = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  update: update,
  destroy: destroy
}

function findAll() {
  return Type.findAll()
}

function findOne() {}

function create() {}

function update() {}

function destroy() {}
