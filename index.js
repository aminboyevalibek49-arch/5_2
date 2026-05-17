// const app = express();
// const http = require("http").createServer(app);
// const { Socket } = require("socket.io");
// const io = require("socket.io")(http);

// app.get("/", (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "index.html"));
// });

// io.on("connection", (Socket) => {
//   Socket.on("join", (room) => {
//     Socket.join(room);
//   });

//   Socket.on("leave", (room) => {
//     Socket.leave(room);
//   });

//   Socket.on("chatmessage,", (data) => {
//     const { room, msg } = data;
//     io.to(room).emit("chatmessage", { chatmessage: msg });
//   });
// });

const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${file.fieldname} -${Date.now()}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("uploads/images"));

app.post("/upload", upload.array("uploads"), (req, res) => {
  const images = req.files.map(
    (Image, i) => `http://localhost:3000/images/${req.files[i].filename}`,
  );

  res.status(200).json({
    data: images,
  });
});

app.listen(3000, () => {
  console.log("ishladi");
});
