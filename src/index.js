const { setupServer } = require("./server");

const server = setupServer();
server.listen(3001, () => {
  console.log("Server is runnning on port 3001");
});
