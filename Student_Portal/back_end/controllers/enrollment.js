const cloudinary = require("cloudinary").v2
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const Course = require("../models/course.models");



// cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
});

// upload image to cloudinary

const uploadImageToCloudinary = (buffer, fileName) =>{
  return new Promise((resolve, reject)=>{
    cloudinary.uploader.upload_stream(
      {
        resource_type : "image",
        public_id: `${Date.now()}_${fileName}`,
        folder : "Students_Images"
      },
      (error, result) =>{
        if(error){
          reject(error)
        } else{
          resolve(result)
        }
      }
    ).end(buffer)
  })
}

// course applicaion function

const applyForCourse = async (req, res) => {

  try {
    const image = req.file;

    const {
      userId,
      name,
      email,
      phone,
      cnic,
      courseSelect,
      campus,
      timeSlot,
      agreement,
    } = req.body;

    if (
      !userId ||
      !name ||
      !email ||
      !phone ||
      !cnic ||
      !courseSelect ||
      !campus ||
      !timeSlot ||
      !image ||
      !agreement
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uploadImage = await uploadImageToCloudinary(
      image.buffer,
      image.originalname
    );

    console.log(uploadImage)

    const course = await new Course({
      userId,
      name,
      email,
      phone,
      cnic,
      courseSelect,
      campus,
      timeSlot,
      image : uploadImage.secure_url,
      agreement,
    });

    console.log(course);

    
    await course.save()

    console.log("done");
  
    res.status(201).json({success : true, message : "Application submit successfully" , data : course})

   
  } catch (error) {
    return res.status(500).json({ success : false , message : "Something is wrong", data : error });
  }

  
};

const getAllApplications = async (req, res) =>{
  console.log("request received")
  try {
    const data = await Course.find()
    res.send(data)
  } catch (error) {
    
  }
}

// find application for download

const downloadIdCard = async (req, res)=>{

  const { cnic } = req.params;


  console.log(cnic)

  try {
    const course = await Course.findOne({cnic})

    return res.status(201).json(course);
  } catch (error) {
    res.status(400).json(error)
  }

  
}

module.exports = {applyForCourse, downloadIdCard, getAllApplications}

// _______________________________________________________________________________________________________-

// const fs = require("fs").promises;
// const path = require("path");

// const filePath = path.join(__dirname, "applications.json");

// async function readApplications() {
//   try {
//     const data = await fs.readFile(filePath, "utf8");
//     return JSON.parse(data);
//   } catch (err) {
//     // If file doesn't exist, return empty array
//     if (err.code === "ENOENT") return [];
//     throw err;
//   }
// }

// async function writeApplications(applications) {
//   try {
//     await fs.writeFile(filePath, JSON.stringify(applications, null, 2));
//   } catch (err) {
//     throw err;
//   }
// }

// module.exports = { readApplications, writeApplications };
