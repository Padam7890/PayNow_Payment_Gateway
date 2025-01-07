"use client"

import SignInPage from "../../../../shadeUI/blocks/LoginForm";

import { useRouter } from "next/navigation";
import { signIn ,useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../redux/slices/userSlice";

const SignInPages= () => {
  const router =useRouter();
  const dashboardLink = "/dashboard";
  const signupLink = "/api/auth/signup";
  const dispatch = useDispatch()
  const { data: session } = useSession();
  console.log(session)
   if (session) {
    const transformedUser = {
      id: Number(session.user.id), 
      email: session.user?.email || null,
      name: session.user.name || null,
      number: session.user.number , 
      password: "",
      address: null,
      city: null,
    };
    dispatch(setUser(transformedUser));
  }

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
