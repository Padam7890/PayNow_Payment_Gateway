import React from "react";

export function Card({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div
      className={`border shadow p-6 bg-white rounded-xl bg-[#ededed ${className}`}
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}