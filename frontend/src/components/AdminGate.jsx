import AdminPanel from "./AdminPanel";

function AdminGate() {
    const pass = prompt("Admin access code");

    if (pass !== "letmein") {
        return <h2>Access denied</h2>;
    }

    return <AdminPanel />;
}

export default AdminGate;