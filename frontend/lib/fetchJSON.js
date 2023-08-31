import axios from 'axios'

const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')

export default function fetchJSON(url) {
  console.log(encodeURI(url))
  return axios.get(encodeURI(url))
    .then(response => response.data)
}
