import AppRoutes from "./routes/AppRoutes";
import { UserContextProvider } from "./context/index";



function App() {
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
    </div>
  );
}

export default App;
