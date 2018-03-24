export default function promiseReject (delay, val) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(val)
    }, delay)
  })
}
