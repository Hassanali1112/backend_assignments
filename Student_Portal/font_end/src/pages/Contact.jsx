import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
        Contact Us
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg">
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
            <label className="text-sm font-medium text-gray-700">Message</label>
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
    </section>
  );
};

export default Contact;
