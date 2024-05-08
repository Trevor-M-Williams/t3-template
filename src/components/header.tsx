import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Mokkit</h1>

        <SignedOut>
          <Button asChild size={"sm"}>
            <SignInButton mode="modal" />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
