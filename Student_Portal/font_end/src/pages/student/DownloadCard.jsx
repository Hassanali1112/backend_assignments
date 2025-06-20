import { useState } from "react";
import html2canvas from "html2canvas";
import axios from "axios";

const DownloadIDCard = () => {
  const [cnic, setCnic] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setStudent(null);

    if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
      setError("Please enter CNIC in correct format: 12345-1234567-1");
      return;
    }

    try {
      const res = await axios.get(`/api/applications/id-card/${cnic}`);
      setStudent(res.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById("id-card");
    const canvas = await html2canvas(element);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "student-id-card.png";
    link.click();
  };

  return (
    <div className="bg-orange-300 mx-auto shadow-md h-auto rounded-md p-6">
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        Download Student ID Card
      </h2>

      <div className="flex gap-2 mb-20 text-white">
        <input
          type="text"
          placeholder="Enter CNIC (12345-1234567-1)"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          className="flex-1 border border-orange-400 rounded px-3 py-2 focus:outline-orange-500"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 "
        >
          Search
        </button>
      </div>

      <div className="card_container max-w-xl flex flex-col justify-center items-center m-auto">
        {error && <p className="text-white text-lg mb-4">{error}</p>}

        {student && (
          <div
            id="id-card"
            className="border rounded-lg shadow p-4 py-4 w-full  text-center"
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
          >
            <h3
              className="text-lg font-semibold pb-2 mb-3 border-b"
              style={{ color: "rgb(30, 64, 175)", borderColor: "#e5e7eb" }}
            >
              Student ID Card
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-6 px-4">
              {/* Left Section - Image */}
              <div className="w-40 h-40 border rounded overflow-hidden">
                {student.imageUrl ? (
                  <img
                    src={student.imageUrl}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>

              {/* Right Section - Info */}
              <div className="text-left space-y-1 text-sm md:text-base">
                <p>
                  <strong>Name:</strong> {student.name}
                </p>
                <p>
                  <strong>CNIC:</strong> {student.cnic}
                </p>
                <p>
                  <strong>Course:</strong> {student.course}
                </p>
                <p>
                  <strong>Campus:</strong> {student.campus}
                </p>
                <p>
                  <strong>Time Slot:</strong> {student.timeSlot}
                </p>
              </div>
            </div>
          </div>
        )}

        {student && (
          <button
            onClick={handleDownload}
            className="mt-4 w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500"
          >
            Download ID Card
          </button>
        )}
      </div>
    </div>
  );
};

export default DownloadIDCard;

// import { useState } from "react";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const DownloadIDCard = () => {
//   const [cnic, setCnic] = useState("");
//   const [student, setStudent] = useState(null);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     setError("");
//     setStudent(null);

//     if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
//       setError("Please enter CNIC in correct format: 12345-1234567-1");
//       return;
//     }

//     try {
//       const res = await axios.get(`/api/applications/id-card/${cnic}`);
//       console.log(res.data)
//       setStudent(res.data);
//     } catch (err) {
//       if (err.response) {
//         setError(err.response.data.message);
//       } else {
//         setError("Server error. Please try again later.");
//       }
//     }
//   };

//   const handleDownload = async () => {
//     const element = document.getElementById("id-card");
//     const canvas = await html2canvas(element);
//     const dataURL = canvas.toDataURL("image/png");

//     const link = document.createElement("a");
//     link.href = dataURL;
//     link.download = "student-id-card.png";
//     link.click();
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-orange-300 shadow-md rounded-md p-6">
//       <h2 className="text-2xl font-bold text-center text-white mb-4">
//         Download Student ID Card
//       </h2>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Enter CNIC (12345-1234567-1)"
//           value={cnic}
//           onChange={(e) => setCnic(e.target.value)}
//           className="flex-1 border rounded px-3 py-2 focus:outline-blue-500"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-orange-400 text-white px-4 rounded hover:bg-orange-700"
//         >
//           Search
//         </button>
//       </div>

//       {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//       {student && (
//         <div
//           id="id-card"
//           className="bg-white border rounded-lg shadow p-4 w-full text-center space-y-2"
//         >
//           <h3 className="text-lg font-semibold text-blue-600 border-b-1 border-black">
//             Student ID Card
//           </h3>
//           <div className="card_container flex gap-8 px-5 my-4">
//             <div className="left w-40 border">
//               {student.imageUrl && (
//                 <img
//                   src={student.imageUrl}
//                   alt="Student"
//                   className="w-[100%] h-[10rem] mx-auto object-cover"
//                 />
//               )}
//             </div>

//             <div className="right text-left py-4 space-y-0.5">
//               <p>
//                 <strong>Name:</strong> {student.name}
//               </p>
//               <p>
//                 <strong>CNIC:</strong> {student.cnic}
//               </p>
//               <p>
//                 <strong>Course:</strong> {student.course}
//               </p>
//               <p>
//                 <strong>Campus:</strong> {student.campus}
//               </p>
//               <p>
//                 <strong>Time Slot:</strong> {student.timeSlot}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {student && (
//         <button
//           onClick={handleDownload}
//           className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Download ID Card
//         </button>
//       )}
//     </div>
//   );
// };

// export default DownloadIDCard;
