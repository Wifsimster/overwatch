<template>
    <div>
        <div class="pure-g">
            <div class="pure-u-1">
                <h2>Backup</h2>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    computed: {
        ws() {
            return this.$store.getters.ws
        }
    },
     data() {
        return {
            uuid: null,   
            backups: null,
        }
     },
    created() {
        this.uuid = Vue.getUUID()
        this.setListener()
        this.getBackups()
    },
    watch: {
        ws() {
            this.setListener()
            this.getBackups()
        }
    },
    methods: {
        setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if('findAll' === data.method && this.uuid === data.uuid) {
                        this.backups = data.results.backups
                    }
                }
            }
        },
        getBackups() {
            if(this.ws) {
                this.ws.send(JSON.stringify({ object: 'Backup', method: 'findAll', uuid: this.uuid}))
            }
        },
    }
}
</script>