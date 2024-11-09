import { db } from "../../../../../db";
import { NextResponse } from "next/server";
import { users } from "../../../../../db/schema";
import { eq } from "drizzle-orm";

interface UpdateUser{
    name?: string;
    email?: string;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error:"can't get user" }, { status: 500 });
    }
}


export async function PUT(req: Request, {params}:{params :{id :string}}){
    try {
        const id = parseInt(params.id);
        const body : UpdateUser = await req.json();
        const {name,email} = body;

        const updateData: UpdateUser = {};
        if(name) updateData.name = name;
        if(email) updateData.email = email;

        const [userUpdate] = await db.update(users).set(updateData).where(eq(users.id, id));
        if(!userUpdate) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ userUpdate }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error:"can't update" }, { status: 500 });
    }
}

export async function DELETE(req: Request, {params}:{params :{id :string}}){
    try {
        const id = parseInt(params.id);
        const [userDelete] = await db.delete(users).where(eq(users.id, id));
        if(!userDelete) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ userDelete }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error:"can't delete" }, { status: 500 });
    }
}