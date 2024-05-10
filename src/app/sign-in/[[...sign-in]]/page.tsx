import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <SignIn path="/sign-in" />
    </div>
  );
}
