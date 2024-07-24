"use client";
import React from 'react';
import SignupForm from '../../../../shadeUI/blocks/RegisterForm';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

const SignupPage = () => {
  const router = useRouter();
  const dashboardLink = "/dashboard";
  const signinLink = "/api/auth/signin"; 

  const redirectLinks = {
    dashboard: () => router.push(dashboardLink),
    signin: () => router.push(signinLink),
  };

  

  return (
    <SignupForm redirectLinks={redirectLinks}  />
  );
};

export default SignupPage;
