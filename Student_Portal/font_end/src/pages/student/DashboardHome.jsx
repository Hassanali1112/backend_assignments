// import { useEffect, useState } from "react";
// import { session } from "../Auth";
// import { useNavigate } from "react-router-dom";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const DashboardHome = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await session();
//         if (response.statusText.toLowerCase() !== "ok") {
//           navigate("/login");
//         } else {
//           setUser(response.data);
//         }
//       } catch (err) {
//         console.error(err);
//         navigate("/login");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   const attendance = 92; // dummy %
//   const tasks = 7; // dummy pending
//   const subjects = [
//     { name: "HTML", count: 10 },
//     { name: "CSS", count: 8 },
//     { name: "JS", count: 12 },
//     { name: "React", count: 6 },
//   ];

//   const upcomingClass = {
//     topic: "React State Management",
//     time: "Tomorrow at 10:00 AM",
//   };

//   return (
//     <div className="w-full p-4 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center flex-wrap">
//         <h1 className="text-xl font-semibold text-gray-800">
//           Welcome, {user?.name || "Student"}
//         </h1>
//       </div>

//       {/* Top 3 Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">
//             Attendance
//           </h2>
//           <p className="text-3xl font-bold text-green-600">{attendance}%</p>
//           <p className="text-sm text-gray-500 mt-1">Overall attendance</p>
//         </div>

//         <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">
//             Pending Tasks
//           </h2>
//           <p className="text-3xl font-bold text-orange-500">{tasks}</p>
//           <p className="text-sm text-gray-500 mt-1">Assignments or quizzes</p>
//         </div>

//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">
//             Subjects Overview
//           </h2>
//           <div className="h-40">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={subjects}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Upcoming Class */}
//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-lg font-semibold text-gray-700 mb-2">
//           Upcoming Class
//         </h2>
//         <p className="text-xl font-medium text-blue-600">
//           {upcomingClass.topic}
//         </p>
//         <p className="text-gray-600 text-sm mt-1">{upcomingClass.time}</p>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;


// ____________________________________________________________________________

import { useEffect, useState } from "react";
import { session } from "../Auth";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const [user, setUser] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [activeUser, setActiveUser] = useState(null)
  const navigate = useNavigate();

  // Dummy data for applied student
  const attendance = {
    totalClasses: 50,
    attended: 45,
    missed: 5,
  };

  const tasks = {
    total: 10,
    completed: 8,
    pending: 2,
  };

  const subjects = [
    { name: "HTML", value: 10 },
    { name: "CSS", value: 10 },
    { name: "JS", value: 15 },
    { name: "React", value: 15 },
  ];

  // Simulate upcoming class
  const upcomingClass = {
    topic: "React State Management",
    date: "Monday, June 24",
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console
        const response = await session();
        console.log(response.statusText)
        setActiveUser(response.data.data)
        if (response.statusText != "Created") {
          return navigate("/login");
        }

        setUser(response.data); // optional enhancement if user data needed

        // Simulate application check (replace with real API)
        const applied = true; // <- make dynamic later
        setHasApplied(applied);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const appliedAttendance = [
    { label: "Attended", value: attendance.attended },
    { label: "Missed", value: attendance.missed },
  ];

  const emptyChart = [
    { label: "N/A", value: 0 },
    { label: "N/A", value: 0 },
  ];

  return (
    <div className="bg-blue-300 p-6 rounded shadow w-full space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-blue-700">
        Welcome{activeUser?.name ? `, ${activeUser.name}` : ""} 👋
      </h1>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Attendance */}
        <div className="bg-blue-100 p-4 rounded shadow text-center space-y-2">
          <h2 className="text-lg font-semibold text-blue-700">Attendance</h2>
          <p className="text-sm">
            {hasApplied
              ? `${attendance.attended}/${attendance.totalClasses} classes attended`
              : "No data yet"}
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={hasApplied ? appliedAttendance : emptyChart}
              margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks */}
        <div className="bg-green-100 p-4 rounded shadow text-center space-y-2">
          <h2 className="text-lg font-semibold text-green-700">Tasks</h2>
          <p className="text-sm">
            {hasApplied
              ? `${tasks.completed}/${tasks.total} tasks completed`
              : "No data yet"}
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={
                hasApplied
                  ? [
                      { label: "Completed", value: tasks.completed },
                      { label: "Pending", value: tasks.pending },
                    ]
                  : emptyChart
              }
              margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subjects */}
        <div className="bg-yellow-100 p-4 rounded shadow text-center space-y-2">
          <h2 className="text-lg font-semibold text-yellow-700">Subjects</h2>
          <p className="text-sm">
            {hasApplied ? "Course Structure Overview" : "No subjects enrolled"}
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={hasApplied ? subjects : emptyChart}
              margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Class */}
      <div className="bg-gray-100 p-4 rounded shadow text-center">
        {hasApplied ? (
          <>
            <h3 className="text-lg font-semibold text-gray-700">
              Upcoming Class Topic
            </h3>
            <p className="text-md text-gray-800 mt-1">{upcomingClass.topic}</p>
            <p className="text-sm text-gray-600">{upcomingClass.date}</p>
          </>
        ) : (
          <p className="text-gray-500">
            No class scheduled — apply to a course
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
