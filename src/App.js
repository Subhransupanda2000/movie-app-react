import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import PerticularMovie from './component/PerticularMovie'
import GetMovie from './component/GetMovie'
import SingleMovie from "./component/SingleMovie";
const App = ()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetMovie/>} />
        <Route path="/particular" element={<SingleMovie/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;