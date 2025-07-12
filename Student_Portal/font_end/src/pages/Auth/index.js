// import { useNavigate } from "react-router-dom"

import axios from "axios";

export const session = async () => {
  try {
 
    const getUser = await axios.get(
      "http://localhost:5000/api/auth/user/get",
      {
        withCredentials: true, 
      }
    );

   
    return getUser;
  } catch (error) {
    console.log(error)
  }
  
};
