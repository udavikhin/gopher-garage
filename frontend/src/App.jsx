import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Layout from "./components/Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CreateOfferPage from "./pages/CreateOfferPage.jsx";
import OfferPage from "./pages/OfferPage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import HelpPage from "./pages/HelpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="offers">
                    <Route path="create" element={<CreateOfferPage />} />
                    <Route path="" element={<OffersPage />} />
                    <Route path=":id" element={<OfferPage />} />
                </Route>
                <Route path="help" element={<HelpPage />} />
            </Route>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
  )
}
export default App
