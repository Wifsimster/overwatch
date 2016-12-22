import Vue from 'vue'

export default {

    get(options, cb) {
        let url = '/api/device?'
        if(options.id) { url += '&id='+ options.id }
        if(options.name) { url += 'name='+ options.name }
        if(options.mac) { url += '&mac='+ options.mac }
        if(options.ip) { url += '&ip='+ options.ip }
        Vue.http.get(url)
            .then((response) => {
            if(response.data && response.data.error) {
                console.error(response.data.message)
            } else {
                cb(response.data)
            }
        }, (err) => {
            console.error(err)
        })
    },

    add() {
        Vue.http.post('/api/device', options).then((response) => {
            cb(response.data)
        }, (err) => {
            console.error(err)
        })
    },

    update(options, cb) {   
        Vue.http.put('/api/device', options)
            .then((response) => {
            if(response.data && response.data.error) {
                console.error(response.data.message)
                cb(response.data)
            } else {
                cb(response.data)
            }
        }, (err) => {
            console.error(err)
        })
    },

    remove() {
        Vue.http.delete('/api/device/:id').then((response) => {
            cb(response.data)
        }, (err) => {
            console.error(err)
        })
    },

}