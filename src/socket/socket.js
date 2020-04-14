let socket

export function initWebsocket () {
  socket = new WebSocket('ws://192.168.50.126:8887/ws')
  socket.addEventListener('open', socketopen)
  socket.addEventListener('message', socketmessage)
  socket.addEventListener('error', socketerror)
}
function socketopen () {
  console.log('open')
}
function socketmessage (msg) {
  console.log(JSON.parse(msg.data))
  setTimeout(() => {
    const obj = {
      Path: 'pong',
      Msg: '1586334170'
    }

    socketsend(obj)
  }, 30)
}
function socketerror (msg) {
  console.log(msg)
}
export function socketsend (msg) {
  socket.send(JSON.stringify(msg))
}
