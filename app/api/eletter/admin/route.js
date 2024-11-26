import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";
import multer from "multer";

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
export async function PATCH(request) {
  try {
    const body = await request.json();

    const newIMG = await query({
      query: `UPDATE eletter SET is_disbled = ${body.is_disbled} WHERE eletter_id = ${body.eletter_id}`,
      values: [],
    });

    const data = {
      status: 200,
      data: newIMG,
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
    const body = await request.json();

    const newIMG = await query({
      query: `UPDATE eletter SET display_order = ${body.display_order} WHERE eletter_id = ${body.eletter_id}`,
      values: [],
    });

    const data = {
      status: 200,
      data: newIMG,
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
export async function GET(request) {
  try {
    const newIMG = await query({
      query: `select * from   eletter  ORDER BY display_order ASC, eletter_id DESC;`,
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
export async function DELETE(request) {
  try {
    const body = await request.json();
    console.log(body);
    
    const newIMG = await query({
      query: `delete  from   eletter  where eletter_id = ?;`,
      values: [body],
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
