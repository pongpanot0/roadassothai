import { NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function PUT(req, res) {
  try {
    const body = await req.json();
    
    body.map(async (res) => {
      const users = await query({
        query: `update image_news set img_index =? where news_img_id=?`,
        values: [res.img_index, res.news_img_id],
      });
      console.log({res,users});
      
    });

    const data = {
      status: 200,
      data: "ok",
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
