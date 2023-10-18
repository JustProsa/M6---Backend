import React from "react";
import LatestPosts from "./components/LatestPosts";

const App = () => {
  return (
    <div>
      <LatestPosts />
    </div>
  );
};

export default App;

//   Si possono avere problemi con i CORS, che bloccano le richieste che il server non ha esplicitamente abilitato tutte le origini come valide. Quindi magari si possono fare richieste solo da www.pippo.org, e il nostro server ci impedirà di fare operazioni che non provengono da determinati indirizzi (scelti da google)
