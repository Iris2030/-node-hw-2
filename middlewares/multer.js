const multer = require("multer");
const { TMP_DIR } = require("../helpers/consts");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: 100,
    fileSize: 300000,
  },
});

module.exports = upload;
