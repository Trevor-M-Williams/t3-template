"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "./breadcrumbs";

export function Header() {
  return (
    <header className="p-8 pb-4">
      <div className="flex justify-between">
        <Link href="/" className="text-2xl font-bold">
          <Image
            src="/mokkit-logo.png"
            alt="Logo"
            width={150}
            height={100}
            draggable={false}
          />
        </Link>
        <SignedOut>
          <Button asChild size={"sm"}>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-2">
            <Link href="/library">Library</Link>
            <UserButton />
          </div>
        </SignedIn>
      </div>

      <Breadcrumbs />
    </header>
  );
}
