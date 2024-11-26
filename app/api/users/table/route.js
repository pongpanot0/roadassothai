import { NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function GET(req, res) {
  try {
    const users = await query({
      query: `SELECT u.*,ut.users_type_name from users u left join users_type ut on (ut.users_type_id = u.user_type)`,
      values: [],
    });
    const data = {
      status: 200,
      data: users,
    };
    return NextResponse.json(data);
  } catch (error) {
    const data = {
      status: 400,
      data: error.message,
    };
    return NextResponse.json(data);
  }
}
export async function PUT(req, res) {
  try {
    const body = await req.json();
    
    
    const users = await query({
      query: `update users set membernumber=?,user_type=? where user_id=?`,
      values: [body.membernumber,body.user_type, body.user_id],
    });
    const data = {
      status: 200,
      data: users,
    };
    return NextResponse.json(data);
  } catch (error) {
    const data = {
      status: 400,
      data: error.message,
    };
    return NextResponse.json(data);
  }
}
