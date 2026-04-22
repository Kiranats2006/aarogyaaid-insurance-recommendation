import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfileForm from "./components/ProfileForm";
import AdminGate from "./components/AdminGate";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<ProfileForm />} />
                    <Route path="/admin" element={<AdminGate />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;