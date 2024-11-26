import { NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function GET(req, res) {
  try {
    const users = await query({
      query: "SELECT * from users",
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
export async function POST(request) {
  try {
    const body = await request.json();

    const users = await query({
      query: `SELECT * from users where user_name='${body.username}' and user_password='${body.password}'`,
      values: [],
    });
    if (users.length > 0) {
      const data = {
        status: 200,
        data: {
          email: users[0].user_id,
          name: users[0].user_name,
          image: users[0].role,
        },
      };

      return NextResponse.json(data);
    } else {
      const data = {
        status: 400,
        data: "error",
      };
      return NextResponse.json(data);
    }
  } catch (error) {
    const data = {
      status: 400,
      data: error.message,
    };
    return NextResponse.json(data);
  }
}
