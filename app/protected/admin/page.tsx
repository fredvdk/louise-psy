import AdminData from "@/components/adminData";
import { Suspense } from "react";

async function AdminPage() {
    return (
        <Suspense fallback={<div>Checking admin rights...</div>}>
            <AdminData />
        </Suspense>
    );
}

export default AdminPage;