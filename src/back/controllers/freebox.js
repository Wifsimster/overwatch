const axios = require('axios')
const crypto = require('crypto')

const baseURL = 'http://mafreebox.freebox.fr/api/v4/'
const appId = 'fr.freebox.overwatch'
// const app_token = '3kYbyFKbG3GUi0LLV6C8HqPx8kwhbPfiXNI8fCW6pt4v57GmtpnAatkOXVwNjwXn'
// const track_id = 7

module.exports = {
  generateToken: generateToken,
  getAuthorization: getAuthorization,
  getChallenge: getChallenge,
  openSession: openSession,
  closeSession: closeSession,
  getInfos: getInfos
}

function generateToken() {
  return axios.post(baseURL + 'login/authorize', {
    app_id: appId,
    app_name: 'Overwatch',
    app_version: '1.0.0',
    device_name: 'Overwatch'
  })
}

function getAuthorization(parameters = { trackId: null }) {
  return axios.get(`${baseURL}login/authorize/${parameters.trackId}`)
}

function getChallenge() {
  return axios.get(`${baseURL}login`)
}

function openSession(parameters = { appId: null, challenge: null }) {
  return axios.post(`${baseURL}login/session`, {
    app_id: parameters.appId,
    password: parameters.challenge
  })
}

function closeSession() {
  return axios.post(`${baseURL}login/logout`, {})
}

function getInfos(parameters) {
  return axios.get(
    `${baseURL}login/session`,
    {},
    {
      headers: { 'X-Fbx-App-Auth': parameters.token }
    }
  )
}
