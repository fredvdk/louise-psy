import { AdminData } from "@/components/adminData";
import { Suspense } from "react";

async function AdminPage() {
    return (
        <div className="w-full mx-auto">
            <Suspense fallback={<div>Checking admin rights...</div>}>
            <AdminData />
        </Suspense>
        </div>
        
    );
}

export default AdminPage;