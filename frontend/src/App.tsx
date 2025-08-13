// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import PersonList from "./Components/PersonList";
import AddPersonForm from "./Components/AddPersonForm";
import { isAuth } from "./Services/auth";
import TopRightLogout from "./Components/TopRightLogout";
import "./App.css"; 
import Layout from "./Components/Layout";
 
// Composant pour protéger les routes privées
const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) =>
  isAuth() ? children : <Navigate to="/" replace />;

function App() {
  return (
    <Router>
      <TopRightLogout /> 
      <Layout>
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
      </Layout>
    </Router>
  );
}

export default App;




