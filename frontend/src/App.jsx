import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProfileForm from "../src/components/ProfileForm";

function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route
                    path="/"
                    element={<ProfileForm />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;