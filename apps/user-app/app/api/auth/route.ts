import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { phone, password, name, city, address, email } = body;

      // Check if the user already exists with either phone or email
      const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { number: phone },
                { email: email }
            ]
        }
    });

    if (existingUser) {
        // Check if the user already exists with the same phone or email
        if (existingUser.number === phone) {
            return NextResponse.json({
                user: null,
                message: "User with this phone number already exists",
                success: false,
            }, {
                status: 400,
            });
        }

        if (existingUser.email === email) {
            return NextResponse.json({
                user: null,
                message: "User with this email already exists",
                success: false,
            }, {
                status: 400,
            });
        }
    }


        // Hash the password and create the new user
        const hash = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash);

        const newUser = await db.user.create({
            data: {
                number: phone,
                name: name,
                city: city,
                address: address,
                email: email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            {
                user: newUser,
                message: "User created successfully",
                success: true,
            },
            {
                status: 201,
            }
        );

    } catch (error) {
        console.error("Error during user registration:", error);
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while processing the request",
            },
            {
                status: 500,
            }
        );
    }
}
