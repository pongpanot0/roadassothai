import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

export async function POST(req, res) {
  try {

    const body = await req.json();
  
    const users = await query({
      query: `SELECT ce.*, c.* 
      FROM course_enroll ce 
      LEFT JOIN course c ON c.course_id = ce.course_id
      WHERE ce.users_id = ${body};`,
      values: [],
    });

 
    
    const data = {
      status: 200,
      data: users,
    };
    return NextResponse.json(data);
  } catch (error) {
    console.log(error.message);
    
    const data = {
      status: 400,
      data: error.message,
    };
    return NextResponse.json(data);
  }
}
export const dynamic = 'force-dynamic'