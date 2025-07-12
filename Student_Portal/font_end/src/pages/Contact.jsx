import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { session } from "./Auth";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [data, setData] = useState(null);

    
      const navigate = useNavigate();
    
      const checkUserAvailiblity = async () => {
        return await session();
      };
    
      useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await checkUserAvailiblity();
    
            setData(response);
          } catch (error) {
            console.log(error);
          }
        };
        fetchUser();
    
        if (!data) {
          navigate('/contact')
        } else {
          navigate("/dashboard");
        }
      }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="container mx-auto my-4 rounded overflow-hidden flex  ">
      <div className="md:w-1/2 w-full">
        <img
          src="https://images.unsplash.com/photo-1529675641475-78780f1fd4b0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your preferred image path
          alt="Login"
          className="w-full h-full object-cover "
        />
      </div>
      <div className="md:w-1/2 w-full bg-white">
        <h1 className="text-3xl font-bold text-blue-600 text-center my-8">
          Contact Us
        </h1>
        <div className="max-w-2xl mx-auto p-8 ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <div>
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 p-2 rounded outline-blue-600 mt-1"
                placeholder="Type your message..."
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
