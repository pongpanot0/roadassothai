import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { log } from "console";

export async function POST(request) {
  try {
    const body = await request.json();
    const users = await query({
      query: `SELECT * from news  where news_id = ${body}`,
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
export async function GET(request) {
  try {
    const params = request.nextUrl.searchParams.get("foo");

    const users = await query({
      query: `SELECT * from image_news where news_id = ${params} and active = '0' order by news_img_id desc`,
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
export async function PUT(request) {
  try {
    const params = request.nextUrl.searchParams.get("foo");

    const users = await query({
      query: `update news set news_watching = news_watching+1  where news_id = ${params}`,
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

export const dynamic = "force-dynamic";
