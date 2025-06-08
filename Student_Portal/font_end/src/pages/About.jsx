const About = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          About Student Portal
        </h1>
        <p className="text-gray-600 text-lg">
          Simplifying your academic journey, one click at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Our goal is to provide students with an efficient and transparent
            platform to apply for courses, check approvals, and stay informed.
          </p>
          <p className="text-gray-700">
            We’re committed to building a secure, responsive, and intuitive
            experience so that students can focus on learning and growth.
          </p>
        </div>
        <img
          src="https://plus.unsplash.com/premium_photo-1670252107566-ce6970421079?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mission"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default About;
