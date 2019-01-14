import axios from 'axios'

export default function fetchJSON (url) {
  return axios.get(url)
    .then(response => response.data)
}
