import { useState, useRef } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { useUserContext } from "../../context/UserContext";

const ApplyCourse = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    cnic: "",
    course: "",
    campus: "",
    timeSlot: "",
    image: null,
    agreement: false,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const { activeUserData } = useUserContext()
    

  const courses = [
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Mobile App Development",
    "AI & Machine Learning",
  ];

  const campuses = ["Paposh", "Headoffice", "Numaish", "Gulshan"];

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
    "5:00 PM - 7:00 PM",
    "7:00 PM - 9:00 PM",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (file) => {
    if (file) {
      if (file.size > 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size should not exceed 1MB",
        }));
        setForm((prev) => ({ ...prev, image: null }));
        setImagePreview(null);
        return;
      }
      setErrors((prev) => ({ ...prev, image: "" }));
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const validate = () => {
    let tempErrors = {};

    if (!form.fullName.trim()) tempErrors.fullName = "Full Name is required";
    if (!form.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!form.phone) {
      tempErrors.phone = "Phone is required";
    } else if (!/^\+92\d{10}$/.test(form.phone)) {
      tempErrors.phone = "Phone must be in +92XXXXXXXXXX format";
    }

    if (!form.cnic) {
      tempErrors.cnic = "CNIC is required";
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(form.cnic)) {
      tempErrors.cnic = "CNIC format should be 12345-1234567-1";
    }

    if (!form.course) tempErrors.course = "Please select a course";
    if (!form.campus) tempErrors.campus = "Please select a campus";
    if (!form.timeSlot) tempErrors.timeSlot = "Please select a time slot";
    if (!form.image) tempErrors.image = "Please upload an image";
    if (!form.agreement)
      tempErrors.agreement = "You must agree before submission";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
    setLoading(true);
    const formData = new FormData()
    formData.append("userId", activeUserData.id);
    formData.append("name", form.fullName)
    formData.append("email", form.email)
    formData.append("phone", form.phone)
    formData.append("cnic", form.cnic)
    formData.append("course", form.course)
    formData.append("campus", form.campus)
    formData.append("timeSlot", form.timeSlot)
    formData.append("image", form.image)


       await axios.post(
        "/api/applications/application", formData
      )
      .then((res)=> console.log(res))
      
    } catch (error) {
      console.log(error)
    }

    setTimeout(() => {
      console.log("Form Submitted: ", form);
      // alert("Application Submitted Successfully!");

      // Reset form
      setForm({
        fullName: "",
        email: "",
        phone: "",
        cnic: "",
        course: "",
        campus: "",
        timeSlot: "",
        image: null,
        agreement: false,
      });
      setImagePreview(null);
      setErrors({});
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto bg-orange-300  shadow-md rounded-md p-8">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        Apply for a Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="font-medium">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full border rounded px-4 py-2 focus:outline-blue-500 ${
                errors.fullName && "border-red-500"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={`w-full border rounded px-4 py-2 focus:outline-blue-500 ${
                errors.email && "border-red-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="font-medium">Phone (+92XXXXXXXXXX) *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+923001234567"
              className={`w-full border rounded px-4 py-2 focus:outline-blue-500 ${
                errors.phone && "border-red-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* CNIC */}
          <div>
            <label className="font-medium">CNIC *</label>
            <input
              type="text"
              name="cnic"
              value={form.cnic}
              onChange={handleChange}
              placeholder="12345-1234567-1"
              className={`w-full border rounded px-4 py-2 focus:outline-blue-500 ${
                errors.cnic && "border-red-500"
              }`}
            />
            {errors.cnic && (
              <p className="text-red-500 text-sm">{errors.cnic}</p>
            )}
          </div>

          {/* Course */}
          <div>
            <label className="font-medium">Course *</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 focus:outline-blue-500 ${
                errors.course && "border-red-500"
              }`}
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="text-red-500 text-sm">{errors.course}</p>
            )}
          </div>

          {/* Campus */}
          <div>
            <label className="font-medium">Campus *</label>
            <select
              name="campus"
              value={form.campus}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 focus:outline-blue-500 ${
                errors.campus && "border-red-500"
              }`}
            >
              <option value="">-- Select Campus --</option>
              {campuses.map((campus) => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
            {errors.campus && (
              <p className="text-red-500 text-sm">{errors.campus}</p>
            )}
          </div>

          {/* Time Slot */}
          <div className="">
            <label className="font-medium">Time Slot *</label>
            <select
              name="timeSlot"
              value={form.timeSlot}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 focus:outline-blue-500 ${
                errors.timeSlot && "border-red-500"
              }`}
            >
              <option value="">-- Select Time Slot --</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.timeSlot && (
              <p className="text-red-500 text-sm">{errors.timeSlot}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="font-medium ">Upload Image *</label>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={` h-35 w-35  border-2 border-dashed rounded-md text-center flex justify-center items-center cursor-pointer ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-44 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setForm((prev) => ({ ...prev, image: null }));
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <p className="text-gray-800">
                  Click or Drop image here (Max 1MB)
                </p>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="hidden"
            />

            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
          </div>
        </div>

        {/* Agreement */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agreement"
              checked={form.agreement}
              onChange={handleChange}
            />
            <span>I confirm all information is correct *</span>
          </label>
          {errors.agreement && (
            <p className="text-red-500 text-sm">{errors.agreement}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center gap-3 items-center"
        >
          {loading ? <Loader /> : ""}
          <span>Submit Application</span>
        </Button>
      </form>
    </div>
  );
};

export default ApplyCourse;
