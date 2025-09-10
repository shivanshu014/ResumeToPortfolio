import { useState } from "react";
import "./App.css";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";

import Template from "./components/Template";

function App() {


  return (
    <>
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer/>
      <Template />
    </>
  );
}

export default App;
