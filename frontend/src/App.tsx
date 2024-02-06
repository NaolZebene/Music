import React from "react";
import './App.css';
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Music from "./pages/Music";
import Albums from "./pages/Albums";
import Analytics from "./pages/Analytics";
import Artists from "./pages/Artists";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
      {/* <NavBar /> */}
      <SideBar>
        <Routes>
          <Route path="/" element={<Music/>}></Route>
          <Route path="/albums" element={<Albums/>}></Route>
          <Route path="/analytics" element={<Analytics/>}></Route>
          <Route path="/artist" element={<Artists/>}></Route>
        </Routes>
        
        </SideBar>
      </BrowserRouter>
      </div>
    
  );
}   

export default App;
