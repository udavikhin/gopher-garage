import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Layout from "./components/Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CreateOfferPage from "./pages/CreateOfferPage.jsx";
import OfferPage from "./pages/OfferPage.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="offers">
                    {/*<Route path="" element={<Listings />} />*/}
                    <Route path="create" element={<CreateOfferPage />} />
                    <Route path=":id" element={<OfferPage />} />
                </Route>
            </Route>
            <Route path="register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
  )
}
export default App
