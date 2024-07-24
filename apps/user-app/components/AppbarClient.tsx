"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({
      redirect: false, // Prevent automatic redirection
    });
    router.push("/api/auth/signin"); // Redirect manually
  };

  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={handleSignOut}
        user={session?.user}
      />
    </div>
  );
}
