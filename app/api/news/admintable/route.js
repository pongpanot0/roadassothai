import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";
import multer from "multer";
import { NextResponse } from "next/server";
const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
});
export async function GET(req, res) {
  try {
    const users = await query({
      query: "SELECT * from news order by news_id desc",
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
export async function DELETE(req, res) {
  try {
    const body = await req.json();
   

    const users = await query({
      query: "delete   from news where  news_id =  ?",
      values: [body],
    });
    const newpic = await query({
      query: "delete   from image_news where  news_id = ?",
      values: [body],
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
