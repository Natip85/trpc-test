"use client";
import Link from "next/link";

import { Button } from "@/ui/button";
import { useUser } from "@/hooks/use-user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { ArrowRight } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  const { session } = useUser();

  return (
    <div className="flex min-h-[85vh] flex-1 flex-col md:flex-row">
      {!session ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex w-full items-center justify-between gap-3 px-5 md:w-2/3">
              <span>SUBMIT AN OFFENSE</span>
              <span>
                <ArrowRight />
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{""}</DialogTitle>
              <DialogDescription>{""}</DialogDescription>
            </DialogHeader>
            <LoginForm callbackUrl="/submit-incident" />
          </DialogContent>
        </Dialog>
      ) : (
        <Button asChild className="px-5 md:w-2/3">
          <Link
            href="/submit-incident"
            className="flex w-full items-center justify-between gap-3"
          >
            <span>SUBMIT AN OFFENSE</span>
            <span>
              <ArrowRight />
            </span>
          </Link>
        </Button>
      )}
    </div>
  );
}
