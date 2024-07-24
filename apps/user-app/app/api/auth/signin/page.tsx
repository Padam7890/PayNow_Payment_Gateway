"use client"

import SignInPage from "../../../../shadeUI/blocks/LoginForm";

import { useRouter } from "next/navigation";
import { signIn ,useSession } from "next-auth/react";

const SignInPages= () => {
  const router =useRouter();
  const dashboardLink = "/dashboard";
  const signupLink = "/api/auth/signup";

  const { data: session } = useSession();

  const redirectLinks = {
    dashboard: () => router.push(dashboardLink),
    signUp: () => router.push(signupLink),
  };


  return (
    !session ?
     <div>
        <SignInPage  redirectLinks={redirectLinks} signIn={signIn}/>
     </div> :
     (redirectLinks.dashboard)
  );
};

export default SignInPages;
