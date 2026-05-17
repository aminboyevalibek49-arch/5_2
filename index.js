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

// Rasmlar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Faqat rasm fayllari qabul qilinadi! (jpg, jpeg, png, webp, gif)`,
      ),
      false,
    );
  }
};

const upload = multer({ storage: fileFilter });

app.use("/images", express.static("uploads/images"));

app.post("/upload", upload.array("uploads"), (req, res) => {
  const images = req.files.map(
    (Image, i) => `http://localhost:3000/images/${req.files[i].filename}`,
  );

  res.status(200).json({
    data: images,
  });
});

// Video
const videoFileFilter = (req, file, cb) => {
  const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
  const allowedExts = [".mp4", ".webm", ".ogg"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Faqat videolar qabul qilinadi! (mp4, webm, ogg)"), false);
  }
};

const videoUpload = multer({ storage: videoFileFilter });

app.use("/videos", express.static("uploads/videos"));

app.post("/upload-video", videoUpload.array("uploads"), (req, res) => {
  const videos = req.files.map(
    (Video, i) => `http://localhost:3000/videos/${req.files[i].filename}`,
  );

  res.status(200).json({
    data: videos,
  });
});
app.listen(3000, () => {
  console.log("ishladi");
});
