
import axios from "axios";

export const session = async () => {
  try {
 
   const getUser = await axios.get("http://localhost:5000/api/auth/user/get/", {
     withCredentials: true, // Must be true for cookies
   })
   
    return getUser;
  } catch (error) {
    console.log(error)
  }
  
};
