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
      const res = await axios.get(
        `http://localhost:5000/applications/id-card/${cnic}`
      );
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
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Download Student ID Card
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter CNIC (12345-1234567-1)"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {student && (
        <div
          id="id-card"
          className="bg-white border rounded-lg shadow p-4 w-full text-center space-y-2"
        >
          <h3 className="text-lg font-semibold text-blue-600">
            Student ID Card
          </h3>
          {student.imageURL && (
            <img
              src={student.imageURL}
              alt="Student"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
          )}
          <p>
            <strong>Name:</strong> {student.fullName}
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
      )}

      {student && (
        <button
          onClick={handleDownload}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Download ID Card
        </button>
      )}
    </div>
  );
};

export default DownloadIDCard;
