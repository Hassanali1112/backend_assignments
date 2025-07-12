import { useEffect } from "react";
import { session } from "../Auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await session();

        console.log(response);

        if (response.statusText.toLowerCase() !== "ok") {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="bg-blue-300 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-white mb-4">My Profile</h2>
      <p className="text-gray-800">Profile details will appear here.</p>
    </div>
  );
};

export default Profile;
