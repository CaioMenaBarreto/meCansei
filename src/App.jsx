import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import SignInPage from "./pages/signInPage";
import SignUnPage from "./pages/signUpPage";
import StorePage from "./pages/storePage";
import {AuthProvider} from "./contexts/AuthContext";
import NewProductPage from "./pages/newProductPage";

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUnPage />} />
          <Route path="/storePage" element={<StorePage />} />
          <Route path="/newProduct" element={<NewProductPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
};
