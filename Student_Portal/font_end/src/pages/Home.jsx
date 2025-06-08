import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to the Student Portal
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Apply for courses, track your application, and download your admin
            card – all in one place.
          </p>
          <Link to="/signup">
            <Button className="text-lg px-6 py-3">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Easy Course Application
            </h3>
            <p className="text-gray-600">
              Submit course requests in seconds with our user-friendly form.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Secure Login
            </h3>
            <p className="text-gray-600">
              Keep your data safe with modern authentication techniques.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Instant Admin Access
            </h3>
            <p className="text-gray-600">
              Track your status and download your admin card once approved.
            </p>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Empowering Students for Success
            </h2>
            <p className="text-gray-700 mb-4">
              Our student portal is designed to simplify your academic journey.
              From enrollment to admin approval, everything is streamlined and
              hassle-free.
            </p>
            <Link to="/about">
              <Button >Learn More</Button>
            </Link>
          </div>
          <img
            src="https://plus.unsplash.com/premium_photo-1683887034491-f58b4c4fca72?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Students"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
