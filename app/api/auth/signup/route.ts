import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.email || !body.password || !body.name) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 } // Bad Request
            );
        }

        const { email, password, name } = body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 409 } // Conflict
            );
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });

        return NextResponse.json(
            { email: newUser.email, name: newUser.name },
            { status: 201 } // Created
        );
    } catch (error) {
        console.error("Error in signup API:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 } // Internal Server Error
        );
    }
}
