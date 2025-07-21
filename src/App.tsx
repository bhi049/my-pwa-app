import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Navigation from "./components/Navigation";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ paddingBottom: "60px" /* space for nav */ }}>
        <AppRoutes />
      </div>
      <Navigation />
    </BrowserRouter>
  );
};

export default App;
