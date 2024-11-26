import { NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function GET(req, res) {
  try {
    const params = req.nextUrl.searchParams.get("foo");

    const users = await query({
      query: `SELECT * from users where user_id=${params}`,
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
      query: `update users set 
      user_email=?,
      firstname_th=?,
      lastname_th=?,
      firstname_en=?,
      lastname_en=?,
      engineers_card=?,
      user_type=?,
      department=?,
      phone=?,
      jobs=?
      where user_id = ?
      
      `,

      values: [
        body.user_email,
        body.firstname_th,
        body.lastname_th,
        body.firstname_en,
        body.lastname_en,
        body.engineers_card,
        body.user_type,
        body.department,
        body.phone,
        body.jobs,
        body.user_id
      ],
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
