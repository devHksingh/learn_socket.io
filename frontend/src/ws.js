import { io } from "socket.io-client";

// export function connectWS() {
//   return io('http://localhost:4002',{
//     // transports: ['websocket'],
//     // upgrade: false,
//   })
// }

const socket = io("http://localhost:4000", {
  autoConnect: false,
});

export default socket;
