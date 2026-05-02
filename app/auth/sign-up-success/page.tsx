import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Dank u voor uw registratie!
              </CardTitle>
              <CardDescription>Controleer uw e-mail ter bevestiging</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                U hebt zich succesvol geregistreerd. Controleer uw e-mail om
                uw account te bevestigen voordat u inlogt.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
