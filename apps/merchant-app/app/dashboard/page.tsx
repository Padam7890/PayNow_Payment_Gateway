"use client"

import { useSession } from 'next-auth/react';
import React from 'react'

const page = () => {
const session = useSession();

  return (
    <div> Hey {session?.data?.user?.name}  You're welcome</div>
  )
}

export default page