import { Route, Routes } from "react-router-dom";
import HomePage from './pages/home/HomePage.tsx';
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage.js";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  );
}