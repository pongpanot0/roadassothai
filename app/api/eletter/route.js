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

export async function POST(request) {
  try {
    const formData = await request.formData(); // ใช้ formData เพื่อรับข้อมูลรูปภาพ

    const id = formData.get("id");
    const news_pic = formData.get("pic");
    const bytes = await news_pic.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const fileName = `${timestamp}_${news_pic.name}`;
    const Elettername_en = formData.get("Elettername_en");
    const date = dayjs().format("YYYY-MM-DD HH:mm:ss"); // MySQL DATETIME format
    const newIMG = await query({
      query: ` INSERT INTO eletter (eletter_name, eletter_name_en, create_date, display_order)
    VALUES ('${id}', '${Elettername_en}', '${date}', 
      (SELECT IFNULL(MAX(display_order), 0) + 1 FROM (SELECT display_order FROM eletter) AS max_display_order)
    )`,
      values: [],
    });
    const newsPath = `./uploads/eletter/${newIMG.insertId}`;
    fs.mkdirSync(newsPath, { recursive: true });

    const path = `./uploads/eletter/${newIMG.insertId}/${fileName}`;
    const pathPOST = `/uploads/eletter/${newIMG.insertId}/${fileName}`;
    await writeFile(path, buffer);
    const updatePDF = await query({
      query: `update  eletter set eletter_pdf='${pathPOST}' where eletter_id =${newIMG.insertId}`,
      values: [],
    });
    const data = {
      status: 200,
      data: updatePDF,
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
      query: `select * from   eletter where is_disbled=0 ORDER BY display_order ASC`,
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

export async function PUT(request) {
  try {
    const multerUpload = upload.single("pic");
    await new Promise((resolve, reject) => {
      multerUpload(request, {}, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    const formData = await request.formData(); // ใช้ formData เพื่อรับข้อมูลรูปภาพ

    const id = formData.get("id");
    const eletter_id = formData.get("eletter_id");
    const Elettername_en = formData.get("Elettername_en");

    const news_pic = formData.get("pic");

    const date = dayjs().format("YYYY-MM-DD HH:mm:ss"); // MySQL DATETIME format
    const newIMG = await query({
      query: `update eletter set eletter_name='${id}',eletter_name_en='${Elettername_en}' where eletter_id='${eletter_id}'`,
      values: [],
    });

    if (news_pic && typeof news_pic !== "string") {
      const bytes = await news_pic.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const timestamp = Date.now();
      const fileName = `${timestamp}_${news_pic.name}`;

      const newsPath = `./uploads/eletter/${eletter_id}`;
      fs.mkdirSync(newsPath, { recursive: true });

      const path = `./uploads/eletter/${eletter_id}/${fileName}`;
      const pathPOST = `/uploads/eletter/${eletter_id}/${fileName}`;
      await writeFile(path, buffer);
      const updatePDF = await query({
        query: `update  eletter set eletter_pdf='${pathPOST}' where eletter_id ='${eletter_id}'`,
        values: [],
      });
    }

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
