import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const client = new PrismaClient();
export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        await client.user.create({
            data: {
                email: body.email,
                password: body.password,
            }
        });
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            msg: "Error while signing up",
        }, {
            status: 411,
        })
    }

    return NextResponse.json({ Email: body.email, password: body.password })
}