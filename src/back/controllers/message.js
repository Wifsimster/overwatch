const Message = require('../models/message')
const Device = require('../models/device')

module.exports = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  update: update,
  destroy: destroy
}

function findAll(parameters = {}) {
  let options = {
    order: [['createdAt', 'DESC']],
    limit: parameters.limit,
    offset: parameters.offset,
    include: [],
    where: {}
  }

  if (parameters.deviceId) {
    options.include.push({ model: Device, where: { id: parameters.deviceId } })
  }
  if (parameters.type) {
    options.where.type = parameters.type
  }

  return Message.findAll(options)
}

function findOne(parameters = {}) {
  return Message.findById(parameters.id)
}

function create() {}

function update() {}

function destroy(parameters = {}) {
  return Message.destroy({ where: parameters })
}
