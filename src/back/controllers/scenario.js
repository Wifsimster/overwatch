module.exports = (device, io) => {
//    require('../scenario/motion')(device, io)
    require('../scenario/morning')(device, io)
    require('../scenario/night')(device, io)
}