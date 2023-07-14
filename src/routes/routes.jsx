import { BrowserRouter, Route, Routes } from "react-router-dom";
import Merchandise from "../pages/Merchandise";
import Stock from "../pages/Stock";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Merchandise />}></Route>
        <Route path="/Stock" element={<Stock />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
