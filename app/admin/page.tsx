import UserData from "@/components/userData";
import { Suspense } from "react";

function AdminPage() {
    return (
        <div>
            <h1>Admin Page</h1>
            <p>Welcome to the admin dashboard!</p>
            <Suspense fallback={<div>Loading user data...</div>}>
                <UserData />
            </Suspense>
        </div>
    );
}

export default AdminPage;