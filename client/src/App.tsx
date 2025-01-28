import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
