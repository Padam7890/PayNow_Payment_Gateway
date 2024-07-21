"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset'; // Add more button types as needed. Default is 'button' type.
  onClick?: () => void;
}

export const Button = ({ children, onClick,type }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
      {children}
    </button>

  );
};
