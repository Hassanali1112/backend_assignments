// import { useNavigate } from "react-router-dom"

import axios from "axios";

 export  const session = async (id, navigate, setLoader) => {
  
   setLoader(true);
   console.log(id);

   const data = await axios.get("/api/auth/session", {
     params: {
       id: id,
     },
   });

   if (data.data.session) {
     navigate("/dashboard");
     setLoader(false);
   } else {
     navigate("/login");
     setLoader(false);
   }
 };

