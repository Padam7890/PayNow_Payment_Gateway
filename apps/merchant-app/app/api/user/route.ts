import { NextResponse } from "next/server"
import prisma from "@repo/db/client";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export const GET = async () => {
    try {
        const session:any = await getServerSession(authOptions);
        if (session.user) {
            return NextResponse.json({
                user: session.user
            })
        }
        
    } catch (error) {
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 403
        })
    }
}