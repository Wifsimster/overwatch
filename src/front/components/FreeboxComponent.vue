<template>
<div class="device freebox" v-if="connection">
  <span>Freebox: {{ connection.state.toUpperCase() }}</span>
  <!--  <span>Down: {{ convert(connection.bandwidth_down) }}</span>-->
  <!--  <span>UP: {{ convert(connection.bandwidth_up) }}</span>-->
  <span>&#8595; {{ convert(connection.rate_down) }}</span>
  <span>&#8593; {{ convert(connection.rate_up) }}</span>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  export default {
    data() {
      return {
        socket: io(),
        auth: {},
        login: {},
        session: {},
        connection: null,
      }
    },
    created() {
      this.init()
      setInterval(() => { this.getData() }, 5000)
    },
    methods: {
      init() {
        this.socket.emit('get.freebox.autorize', (data) => {
          if(data.success) {
            this.auth.challenge = data.result.challenge
            this.auth.salt = data.result.password_salt
            this.auth.status = data.result.status
            if(this.auth.status === 'granted') {
              this.socket.emit('get.freebox.login', (data) => {
                if(data.success) {
                  this.login.challenge = data.result.challenge
                  this.login.salt = data.result.password_salt
                  this.login.loggedIn = data.result.logged_in
                  this.socket.emit('open.freebox.session', {
                    challenge: this.login.challenge
                  }, (data) => {
                    if(data.success) {
                      this.session.challenge = data.result.challenge
                      this.session.salt = data.result.password_salt
                      this.session.token = data.result.session_token
                      this.session.permissions = data.result.permissions
                      this.getData()
                    }
                  })
                }
              })
            }
          }
        })
      },
      getData() {
        this.socket.emit('get.freebox.connection', {
          token: this.session.token
        }, (data) => {
          if(data.success) {
            this.connection = data.result
          }
        })
      },
      convert(value) {
        let o = value / 8
        if(o > 999) {
          let ko = o / 1000
          if(ko > 999) {
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

<style lang="sass" scoped>
@import '../sass/_device.scss';

.freebox {
  span {
    font-size: 22px;
    }
  }
</style>