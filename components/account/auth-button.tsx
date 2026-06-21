import Link from "next/link";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/server";
import AvatarMenu from "./avatar-menu";
import AdminPageButton from "../AdminPageButton";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  //console.log(user)

  return user ? (
    <div className="flex items-center gap-4 text-xs">
      <AdminPageButton />
      <AvatarMenu avatarUrl={user.avatar_url} email={user.email} />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Inloggen</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Registreren</Link>
      </Button>
    </div>
  );
}
