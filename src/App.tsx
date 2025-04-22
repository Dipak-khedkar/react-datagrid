import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import PublicRoutes from "./components/auth/PublicRoutes";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import Layout from "./components/Layout";
import StudentsList from "./pages/StudentsList";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="students-list" element={<StudentsList />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
