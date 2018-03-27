export default function fetchJSON (url) {
  return fetch(url)
    .then(response => response.json())
}
