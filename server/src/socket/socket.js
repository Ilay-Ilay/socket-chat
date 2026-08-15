export default function initializeSocket(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("sendMessage", async (data) => {
      console.log(data);
      socket.userId;
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}
