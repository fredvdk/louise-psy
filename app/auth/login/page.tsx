import { Footer } from "@/components/footer";
import { LoginForm } from "@/components/account/login-form";
import { Navbar } from "@/components/navbar";

export default function Page() {
  return (
    
    <div className="w-full mx-auto">
      <Navbar showMenu={false}/>
      <div className="lg:w-1/3 md:w-1/2 mx-auto my-8">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
