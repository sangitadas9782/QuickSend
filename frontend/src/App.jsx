import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { Profile } from "./pages/Profile";
import { TransactionHistory } from "./pages/TransactionHistory";
import { Home } from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard"element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/send"element={<PrivateRoute><SendMoney /></PrivateRoute>} />
          <Route path="/profile"element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/transactions"element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;