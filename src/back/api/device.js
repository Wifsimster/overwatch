import router from('express').Router()
import User from('../models/device')
import errorHandler from('./errorHandler')

router.get('/', function(req, res) {    
    var name = req.param.name || null
    var id = req.param.id || null
    var ip = req.param.ip || null
    var options = {
        //        include: [ Establishment ],
        where : {},
    }
    if(username) { options.where.name = name }    
    if(id) { options.where.id = id }
    Device.findAll(options).then(function(rst) { res.json(rst) })
})

router.get('/:id', function(req, res) {
    Device.findById(req.params.id).then(function (device) {
        if(device) { res.json(device) } 
        else { res.json(errorHandler({ message:'Device unknow !' })) }
    }).catch(function(err){ res.json(errorHandler(err)) })
})

router.post('/', function(req, res) {
    Device.create({
        name: req.body.name,
        mac: req.body.mac,
        ip: req.body.ip,
    })
        .then(function (rst) { res.json(rst) })
        .catch(function(err) { res.json(errorHandler(err)) })
})

router.put('/', function(req, res) {
    Device.findById(req.body.id).then(function(rst){
        if(rst) {
            rst.update({
                name: req.body.name,
                mac: req.body.mac,
                ip: req.body.ip,
            })
                .then(function (rst) { res.json(rst) })
                .catch(function(err) { res.json(errorHandler(err)) })
        } else { res.json(errorHandler({ message:'Device unknow !' })) }
    }).catch(function(err) { res.json(errorHandler(err)) })
})

router.delete('/:id', function(req, res) {
    Device.destroy({ where: { id: req.params.id }})
        .then(function(row) { if(row === 1) { res.json({ message: 'Device deleted !' }) } })
        .catch(function(err) { res.json(errorHandler(err)) })
})

module.exports = router