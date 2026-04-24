"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function AccountForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [naam, setNaam] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;
        if (!user) throw new Error("No user found");

        setEmail(user.email || "");

        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, mobile, address")
          .eq("id", user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          throw profileError;
        }

        if (data) {
          setNaam(data.full_name || "");
          setMobile(data.mobile || "");
          setAddress(data.address || "");
        }
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "Failed to load user data"
        );
      } finally {
        setIsLoadingUser(false);
      }
    };

    loadUserData();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) throw new Error("No user found");

      const { error: updateError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: naam,
          mobile : mobile,
          address: address
        //  updated_at: new Date().toISOString(),
        });

      if (updateError) throw updateError;
      setSuccess("Account updated successfully!");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingUser) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-sm text-gray-500">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Account gegevens</CardTitle>
          <CardDescription>Update je profiel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">
                  Email kan niet gewijzigd worden
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="naam">Naam <span className="text-red-500">*</span></Label>
                <Input
                  id="naam"
                  type="text"
                  placeholder="Geef je volledige naam"
                  value={naam}
                  onChange={(e) => setNaam(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mobile">Telefoon <span className="text-red-500">*</span></Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Voer je telefoon of gsm nummer in"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Adres</Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Opslaan..." : "Opslaan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
