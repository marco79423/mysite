import axios from 'axios'

export default function fetchJSON (url) {
  return axios.get(encodeURI(url))
    .then(response => response.data)
}
