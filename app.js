const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();
const contactsRouter = require("./app/routes/contact.route");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});
app.use("/api/contacts", contactsRouter);
//handle 404 response
app.use((req, res, next) => {
  //code ở đây sẽ chạy khi không có route được định nghĩa
  //nếu khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Resource not fount"));
});

app.use((error, req, res, next) => {
  //middleware xử lý lỗi tập trung
  //trong các đoạn code xử lý ở các route, gọi next(error) se chuyển về middleware lỗi này
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});
module.exports = app;
