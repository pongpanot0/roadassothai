import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";

export async function GET(request) {
  try {
    const params = request.nextUrl.searchParams.get("foo");
    const newIMG = await query({
      query: `select * from   eletter where eletter_id=${params}`,
      values: [],
    });
    const updateView = await query({
        query: `update eletter set eletter_view=eletter_view+1 where eletter_id=${params}`,
        values: [],
      });
  
    
    const data = {
      status: 200,
      data: newIMG,
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


export const dynamic = 'force-dynamic'