import { jsonResponse } from "@/lib/utils";
import { getAuthenticatedClient } from "@/lib/supabase/authDb";
import { getAllClients } from "@/lib/supabase/clientenDb";

export async function GET() {
  try {
    // Get authenticated client and check role
    const { role } = await getAuthenticatedClient();

    // Check if user is admin
    if (!role.data || role.data.length === 0 || role.data[0]?.role !== "admin") {
      return jsonResponse({ error: "Unauthorized: Admin access required" }, 403);
    }

    // Fetch all clients using clientenDb function
    const result = await getAllClients();

    if (!result.success) {
      return jsonResponse({ error: result.error }, 500);
    }

    return jsonResponse({ success: true, clienten: result.data }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return jsonResponse({ error: message }, 401);
  }
}