import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rates from "./Pages/Rates";

import MainLayout from "./Layouts/MainLayout";

import "./App.css";
import { Toaster } from "sonner";

const App = () => (
  <>
    <Toaster position="top-right" richColors />
    <Router>
      <Routes>
        <Route
          path="/rates"
          element={
            <MainLayout title="Rates">
              <Rates />
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
            <MainLayout title="Rates">
              <Rates />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  </>
);

export default App;
