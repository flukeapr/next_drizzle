import { db } from "../../../../db";
import { posts } from "../../../../db/schema";
import { NextResponse } from "next/server";

interface Post {
    title: string;
    content: string;
    user_id: number;
}

export async function POST(req: Request) {
    try {
        const body : Post = await req.json();
        const { title, content, user_id } = body;
        if(!title || !content || !user_id) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const [newPost] = await db.insert(posts).values({ title, content, user_id }).$returningId();
        return NextResponse.json({ newPost }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "can't create post" }, { status: 500 });
    }
}