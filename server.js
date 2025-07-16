const app = require("./app");

const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");
// const PORT = config.app.port;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("Connected to the databse");
    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("cannot connect to the database!", error);
    process.exit();
  }
}
startServer();
