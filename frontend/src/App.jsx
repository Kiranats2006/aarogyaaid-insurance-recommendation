import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProfileForm from "./components/ProfileForm";
import AdminGate from "./components/AdminGate";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProfileForm />} />

                <Route path="/admin" element={<AdminGate />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;