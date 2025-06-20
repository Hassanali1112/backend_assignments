const fs = require("fs").promises;
const path = require("path");
// const multer = require("multer");
const cloudinary = require("cloudinary").v2
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../applications.json");

// cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
});

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

async function readApplications() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist, return empty array
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeApplications(applications) {
  try {
    await fs.writeFile(filePath, JSON.stringify(applications, null, 2));
  } catch (err) {
    throw err;
  }
}

const applyForCourse = async (req, res) => {

//  console.log(26 , req.body)
  // console.log(req.file)


  // res.send("Hassn ali")

  const image = req.file
  // console.log("image", image)
  
  const { userId, name, email, phone, cnic, course, campus, timeSlot } =
    req.body;

  if (
    !userId ||
    !name ||
    !email ||
    !phone ||
    !cnic ||
    !course ||
    !campus ||
    !timeSlot 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log("new");


  const uploadImage = await uploadImageToCloudinary(
    image.buffer,
    image.originalname
  );

  console.log("cloudinary upload",uploadImage)

  try {
    console.log("try")
    const applications = await readApplications();

    // check if user has already applied (status not rejected)
    const existingApplication = applications.find(
      (app) => app.userId === userId && app.status !== "rejected"
    );

    if (existingApplication) {
      return res.status(400).json({
        message:
          "You have already applied. Wait until your previous request is processed.",
      });
    }

    const newApplication = {
      id: uuidv4(),
      userId,
      name,
      email,
      phone,
      cnic,
      course,
      campus,
      timeSlot,
      imageUrl: uploadImage.secure_url,
      status: "pending", // by default pending
      createdAt: new Date().toISOString(),
    };

    applications.push(newApplication);
    await writeApplications(applications);

    return res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {applyForCourse}

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
