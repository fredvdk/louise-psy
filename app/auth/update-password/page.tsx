import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { UpdatePasswordForm } from "@/components/update-password-form";

export default function Page() {
  return (
    <div className="container mx-auto">
      <Navbar showMenu={false} />
      <div className="lg:w-1/3 md:w-1/2 mx-auto my-8">
        <UpdatePasswordForm />
      </div>
      <Footer />
    </div>
  );
}
