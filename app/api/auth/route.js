import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";
export async function POST(req, res) {
  try {
    const body = await req.json();

    const users = await query({
      query: `SELECT * from users where user_name='${body.username}'`,
      values: [],
    });
    if (users.length > 0) {
      if (users[0]?.user_password == body.password) {
        const data = {
          status: 200,
          data: users,
        };
        return NextResponse.json(data);
      } else {
        const data = {
          status: 201,
        };
        return NextResponse.json(data);
      }
    } else {
      const data = {
        status: 201,
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
