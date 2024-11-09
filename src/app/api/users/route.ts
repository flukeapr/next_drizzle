import { NextResponse } from "next/server"
import { db } from "../../../../db"
import { users } from "../../../../db/schema"
export async function GET(req:Request) {
    try {
        const allUsers = await db.select().from(users)
        return  NextResponse.json({allUsers},{status:200}) 
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
  
}

export async function POST(req:Request) {
    try {
        const {name,email} = await req.json()
        const [newUser] = await db.insert(users).values({name,email}).$returningId()
        return  NextResponse.json({newUser},{status:200}) 
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
  
}