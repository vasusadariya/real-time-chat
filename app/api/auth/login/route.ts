import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 404 }
      );
    }

    const email = body.email;
    const password = body.password;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 } // Correct status for invalid credentials
      );
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error handling login request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 } // Correct status for server errors
    );
  }
}
