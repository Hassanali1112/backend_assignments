import { useUserContext } from "../../context/UserContext";

const DashboardHome = () => {
  const { activeUserData } = useUserContext()
  console.log(activeUserData)

  return (
    <div className="bg-orange-300 p-6 rounded shadow">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Welcome to your Dashboard!
      </h1>
      <p className="text-gray-800">
        You can apply for courses, track your application status and download
        your admin card.
      </p>
    </div>
  );
};

export default DashboardHome;
