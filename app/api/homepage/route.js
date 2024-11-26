import { NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function GET(request, res) {
  try {
    const users = await query({
      query: `SELECT * from homepage`,
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
export async function PUT(request, res) {
  try {
    const body = await request.json();

    const users = await query({
      query: `update homepage set homepage_detail=?,homepage_detail_en=?,homepage_pic=?`,
      values: [
        body.homepage_detail,
        body.homepage_detail_en,
        body.homepage_pic,
      ],
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
