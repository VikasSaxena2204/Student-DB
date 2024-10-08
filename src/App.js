import React from "react";

import MyRouter from "./router/index.js";
import Navbar from "./components/Navbar.js";


function App() {
  return (
    <div>

      <Navbar /> 
      <MyRouter />

    </div>
  );
}

export default App;
