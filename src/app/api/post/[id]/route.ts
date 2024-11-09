import { db } from "../../../../../db";
import { posts,users } from "../../../../../db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

interface Post {
    title: string;
    content: string;
    user_id: number;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
       const userWithPost = await db
       .select({
        post:{
            id:posts.id,
            title:posts.title,
            content:posts.content
        },
        user:{
            id:users.id,
            name:users.name,
            email:users.email
        }
       })
       .from(users)
       .leftJoin(posts,eq(users.id,posts.user_id))
       .where(eq(users.id, id));

       const result = {
        user:userWithPost[0].user,
        posts: userWithPost.map((item) => item.post)
       }

       if(!result) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
       }

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "can't get post" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const body: Post = await req.json();
        const { title, content } = body;
        const [postUpdate] = await db
            .update(posts)
            .set({ title, content })
            .where(eq(posts.id, id));
        if(!postUpdate) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        return NextResponse.json({ postUpdate }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "can't update post" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const [postDelete] = await db.delete(posts).where(eq(posts.id, id));
        if(!postDelete) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        return NextResponse.json({ postDelete }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "can't delete post" }, { status: 500 });
    }
}


