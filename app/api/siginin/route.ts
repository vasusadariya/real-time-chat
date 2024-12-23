import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const client = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const user = await client.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            },
        });

        if (!user || user.password !== body.password) {
            return NextResponse.json({
                msg: "Invalid email or password",
            }, {
                status: 401,
            });
        }
    } catch (e)
     {  console.log(e);
        return NextResponse.json({
            msg: "Error while signing in",
        }, {
            status: 500,
        });
    }

    return NextResponse.json({
        msg: "Sign-in successful",
        email: body.email,
    });
}
