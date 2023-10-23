import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

//   Si possono avere problemi con i CORS, che bloccano le richieste che il server non ha esplicitamente abilitato tutte le origini come valide. Quindi magari si possono fare richieste solo da www.pippo.org, e il nostro server ci impedirà di fare operazioni che non provengono da determinati indirizzi (scelti da google)

// Tutti i figli (Outlet) della ProtectedRoute potranno essere visualizzati solo se rispetterano i requisiti decisi in ProtectedRoute
