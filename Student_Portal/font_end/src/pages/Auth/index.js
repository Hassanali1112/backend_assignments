// import { useNavigate } from "react-router-dom"

import axios from "axios";

export const session = async () => {
  try {
    console.log("request");
    // const getUser = await axios.get("http://localhost:5000/api/auth/user/get");
    // console.log("user get =>", getUser);

    const getUser = await axios.get("/api/auth/user/get", {
      withCredentials: true, // this sends cookies
    });

    console.log("user get =>", getUser);

    return getUser;
  } catch (error) {
    console.log(error)
  }
  
};
