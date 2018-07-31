export default {
  install: (Vue, url, store) => {
    if (!url) throw new Error('[Vue-WS] URL is missing !')

    const ws = new WebSocket(url)

    Vue.prototype.$ws = ws

    console.log('ws :', ws)

    ws.onmessage = message => {
      console.log('on message :', message)
    }

    ws.onerror = err => {
      store.dispatch('setWebSocketHealth', 'error')
      console.error('WS on error :', err)
    }

    ws.onopen = () => {
      store.dispatch('setWebSocketHealth', 'online')
      console.log('WS connection opened !')
    }

    ws.onclose = () => {
      store.dispatch('setWebSocketHealth', 'closed')
      console.warn('Connection WS closed !')
    }
  }
}
