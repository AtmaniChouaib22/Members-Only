import Home from "@/pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Navbar from "./components/custom/Navbar";

export const appContext = createContext({
  isLogged: false,
  setIsLogged: (isLogged: boolean) => {},
  isMember: false,
  setIsMember: (isMember: boolean) => {},
  isAdmin: false,
  setIsAdmin: (isAdmin: boolean) => {},
});

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <appContext.Provider
      value={{
        isLogged,
        setIsLogged,
        isMember,
        setIsMember,
        isAdmin,
        setIsAdmin,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  );
}

export default App;
