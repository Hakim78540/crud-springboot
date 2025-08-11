// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import PersonList from "./Components/PersonList";
import AddPersonForm from "./Components/AddPersonForm";

const isAuth = () => !!localStorage.getItem("token");

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) =>
  isAuth() ? children : <Navigate to="/" replace />;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/persons"
          element={
            <PrivateRoute>
              <PersonList />
            </PrivateRoute>
          }
        />
        <Route
          path="/persons/new"
          element={
            <PrivateRoute>
              <AddPersonForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;




