const Stream = require('node-rtsp-stream')
const jsonfile = require('jsonfile')
const file = 'config/default.json'

jsonfile.readFile(file, (err, obj) => { 
    const camera01 = obj.settings.cameras.camera_01
    const camera02 = obj.settings.cameras.camera_02

    let url = `rst://${camera01.ip}:${camera01.port}/${camera01.format}`
    try {
        let stream01 = new Stream({ name: 'camera01', streamUrl: url, wsPort: 9962 })
        }
    catch (err) {
        console.log('Stream 01 failed !')
    }

    try {
        let url = `rst://${camera02.ip}:${camera02.port}/${camera02.format}`
        let stream02 = new Stream({ name: 'camera02', streamUrl: url, wsPort: 9963 })  
        }
    catch (err) {
        console.log('Stream 02 failed !')
    }
})