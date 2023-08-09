import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import SignInPage from "./pages/signInPage";
import SignUnPage from "./pages/signUpPage";
import StorePage from "./pages/storePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUnPage />} />
        <Route path="/storePage" element={<StorePage />} />
      </Routes>
    </BrowserRouter>
  );
};
