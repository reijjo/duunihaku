import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Duunit = lazy(() => import("./pages/Duunit"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Duunit />} />
      <Route path="*" element={<Duunit />} />
    </Routes>
  );
}

export default App;
