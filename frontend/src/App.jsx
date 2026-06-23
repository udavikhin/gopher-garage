import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Layout from "./components/Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
  )
}
export default App
