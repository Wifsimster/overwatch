<template>
    <div>
        <transition name="opacity">
            <div class="freebox" v-if="connection" @click="modalShow = true">
                <span>Freebox: {{ connection.state.toUpperCase() }}</span>
                <span>&#8595; {{ convert(connection.rate_down) }}</span>
                <span>&#8593; {{ convert(connection.rate_up) }}</span>
            </div>
        </transition>
    
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
const Modal = () => import('./ModalComponent.vue')
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
    computed: {
        ws() {
            return this.$store.getters.ws
        },
    },
    data() {
        return {            
            auth: {},
            login: {},
            session: {},
            connection: null,
            modalShow: false,
        }
    },
    created() {
        this.init()
        setInterval(() => { this.getData() }, 5000)
    },
    methods: {
        onClose() {
            this.modalShow = false
        },
        init() {
            this.ws.emit('freebox.getAutorize')
            this.ws.on('freebox.getAutorize.result', (data) => {
                if (data.success) {
                    this.auth.challenge = data.result.challenge
                    this.auth.salt = data.result.password_salt
                    this.auth.status = data.result.status
                    if (this.auth.status === 'granted') {
                        this.ws.emit('freebox.login')
                    }
                }
            })
            this.ws.on('freebox.login.result', (data) => {
                if (data.success) {
                    this.login.challenge = data.result.challenge
                    this.login.salt = data.result.password_salt
                    this.login.loggedIn = data.result.logged_in
                    this.ws.emit('freebox.openSession', {
                        challenge: this.login.challenge
                    })
                }
            })
            this.ws.on('freebox.openSession.result', (data) => {
                if (data.success) {
                    this.session.challenge = data.result.challenge
                    this.session.salt = data.result.password_salt
                    this.session.token = data.result.session_token
                    this.session.permissions = data.result.permissions
                    this.getData()
                }
            })
        },
        getData() {
            this.ws.emit('freebox.connection', {
                token: this.session.token
            })
            this.ws.on('freebox.connection.result', (data) => {
                if (data.success) {
                    this.connection = data.result
                }
            })
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
    },
}
</script>

<style lang="scss" scoped>
@import '../sass/_device.scss';

.freebox {
  span {
    font-size: 22px;
  }
}
</style>