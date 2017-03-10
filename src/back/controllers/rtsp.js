const Stream = require('node-rtsp-stream-es6')
const jsonfile = require('jsonfile')
const file = 'config/default.json'

jsonfile.readFile(file, (err, obj) => { 
    const camera01 = obj.settings.cameras.camera_01
    const camera02 = obj.settings.cameras.camera_02

    let url = `rtsp://${camera01.ip}:${camera01.port}/${camera01.format}`

    try {
        const stream01 = new Stream({ 
            name: 'camera01', 
            url: url, 
            port: 9962 
        })
        stream01.start()
    }
    catch (err) { console.log('Stream 01 failed !', err) }

    try {
        let url = `rtsp://${camera02.ip}:${camera02.port}/${camera02.format}`
        let stream02 = new Stream({
            name: 'camera02', 
            url: url, 
            port: 9963
        })
        stream02.start()
    }
    catch (err) { console.log('Stream 02 failed !', err) }
})