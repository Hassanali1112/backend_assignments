import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* <Navbar /> */}
      
        <AppRoutes />
      
      {/* <Footer /> */}
    </div>
  );
}

export default App;
