const { setupServer } = require("./server");

const server = setupServer();
server.listen(80, () => {
  console.log("Server is runnning on port 80");
});
