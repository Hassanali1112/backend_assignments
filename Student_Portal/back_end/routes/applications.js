const { applyForCourse, downloadIdCard } = require("../controllers/enrollment")
const multer = require("multer");
const express = require("express")


// multer initialization

const storage = multer.memoryStorage();

const upload = multer(
  {
    limits : {
      fileSize : 1 * 1024 * 1024
    },
    fileFilter : (req,file, cb) => {
      if(file.mimetype.startsWith("image/")){
        cb(null, true)
      } else {
        cb( new Error("Only image file is required!"), false)
      }
    },
    storage,
  }
)


 const applicationsRouter = express.Router()

applicationsRouter.post('/application', upload.single("image") ,applyForCourse)
applicationsRouter.get("/id-card/:cnic", downloadIdCard);

module.exports = applicationsRouter
