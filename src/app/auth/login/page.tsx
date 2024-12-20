import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-1 items-center justify-center p-2">
      <Button
        variant="ghost"
        asChild
        className="hover:text-primary absolute left-4 top-4 hover:bg-transparent"
      >
        <Link href="/">
          <ArrowLeft /> Back
        </Link>
      </Button>
      <LoginForm />
    </div>
  );
}
