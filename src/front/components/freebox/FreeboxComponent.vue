<template>
    <div>
        <div class="freebox" @click="modalShow = true" v-if="connection">
            <span>Freebox: {{ connection.state.toUpperCase() }}</span>
            <span>&#8595; {{ convert(connection.rate_down) }}</span>
            <span>&#8593; {{ convert(connection.rate_up) }}</span>
            <span>Coucou</span>
        </div>
    
        <modal v-if="modalShow" @close="onClose">
            <div slot="header">Freebox</div>
            <div slot="body">
                <ul>
                    <li>Rate down: {{ convert(connection.rate_down) }}</li>
                    <li>Rate up: {{ convert(connection.rate_up) }}</li>
                    <li>Bandwidth down: {{ convert(connection.bandwidth_down) }}</li>
                    <li>Bandwidth up: {{ convert(connection.bandwidth_up) }}</li>
                    <li>Bytes down: {{ convert(connection.bytes_down) }}</li>
                    <li>Bytes up: {{ convert(connection.bytes_up) }}</li>
                    <li>IPv4: {{ connection.ipv4 }}</li>
                    <li>Port range: {{ connection.ipv4_port_range[0] }} - {{ connection.ipv4_port_range[1] }}</li>
                    <li>IPv6: {{ connection.ipv6 }}</li>
                    <li>Media: {{ connection.media }}</li>
                    <li>State: {{ connection.state }}</li>
                    <li>Type: {{ connection.type }}</li>
                </ul>
            </div>
        </modal>    
    </div>
</template>

<script>
import Vue from 'vue'
const Modal = () => import('../ModalComponent.vue')
export default {
    components: { 
        Modal 
    },
    props: {
        settings: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            uuid: null,
            auth: {},
            login: {},
            session: {},
            connection: null,
            modalShow: false,
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getInfos()
    },
    methods: {
        getInfos() {
            this.$ws.send(JSON.stringify({ object: 'Freebox', method: 'getAuthorization', uuid: this.uuid }))
            
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    switch(data.method) {
                        case 'getAutorize':
                            this.auth.challenge = data.result.challenge
                            this.auth.salt = data.result.password_salt
                            this.auth.status = data.result.status
                            if (this.auth.status === 'granted') {
                                this.$ws.send(JSON.stringify({ object: 'Freebox', method: 'getChallenge', uuid: this.uuid }))
                            }
                        break
                        case 'login':
                            this.login.challenge = data.result.challenge
                            this.login.salt = data.result.password_salt
                            this.login.loggedIn = data.result.logged_in
                            this.$ws.send(JSON.stringify({ object: 'Freebox', method: 'openSession', parameters: {
                                challenge: this.login.challenge
                            }}))
                        break
                        case 'openSession':                   
                            this.session.challenge = data.result.challenge
                            this.session.salt = data.result.password_salt
                            this.session.token = data.result.session_token
                            this.session.permissions = data.result.permissions
                            this.$ws.send(JSON.stringify({ object: 'Freebox', method: 'getInfos', parameters: { 
                                token: this.session.token 
                            }}))
                        break
                        case 'getInfos':
                            this.connection = data.result
                            this.refresh()
                        break
                        default:
                            console.error('Invalid method :', data.method)
                    }
                }
            }
        },
        refresh() {
            setInterval(() => { 
                this.$ws.send(JSON.stringify({ object: 'Freebox', method: 'connection', uuid: this.uuid }))
            }, 5000)
        },
        convert(value) {
            let o = value / 8
            if (o > 999) {
                let ko = o / 1000
                if (ko > 999) {
                    let mo = ko / 1000
                    return parseFloat(mo).toFixed(2) + ' Mo/s'
                } else {
                    return parseFloat(ko).toFixed(2) + ' Ko/s'
                }
            } else {
                return parseFloat(o).toFixed(2) + ' o/s'
            }
        },
        onClose() {
            this.modalShow = false
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../sass/device';
.freebox {
  span {
    font-size: 22px;
  }
}
</style>