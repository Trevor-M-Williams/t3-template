import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <SignUp path="/sign-up" />
    </div>
  );
}
