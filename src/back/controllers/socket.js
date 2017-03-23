module.exports = (io) => {
    io.on('connection', (socket) => {
        require('../api/device')(socket)
        require('../api/message')(socket)
        require('../api/type')(socket)
        require('../api/location')(socket)
        require('../api/setting')(socket)
        require('../api/freebox')(socket)
        require('../api/yeelight')(socket)
    })
}