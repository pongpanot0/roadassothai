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
export async function GET(req, res) {
  try {
    const users = await query({
      query: "SELECT * from news  order by news_id desc",
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
    const multerUpload = upload.single("news_pic");

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
    const news_desc = formData.get("news_desc"); // ดึงค่า news_desc จาก formData
    const news_title = formData.get("news_title"); // ดึงค่า news_title จาก formData
    const pic_column = formData.get("pic_column");
    const news_pic = formData.get("news_pic");

    const news_createdate = dayjs(new Date()).format("YYYY-MM-DD");
    const users = await query({
      query: `insert into news (news_createdate,news_desc,news_title,pic_column)
      values ('${news_createdate}','${news_desc}','${news_title}','${pic_column}')
      `,
      values: [],
    });
    if (news_pic !== null) {
      const bytes = await news_pic.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const timestamp = Date.now();
      const fileName = `${timestamp}_${news_pic.name}`;
      const newsPath = `./uploads/${users.insertId}`;
      fs.mkdirSync(newsPath, { recursive: true });
      const path = `./uploads/${users.insertId}/${fileName}`;
      const pathPOST = `/uploads/${users.insertId}/${fileName}`;
      await writeFile(path, buffer);
      const update = await query({
        query: `update news set news_pic='${pathPOST}' where news_id = ${users.insertId} 
        `,
        values: [],
      });
    }

    const news_pic_length = Number(formData.get("news_pic_length"));

    // Loop through the photos and store their data
    if (news_pic_length > 0) {
      for (let i = 0; i < news_pic_length; i++) {
        const news_pic = formData.get(`news_pic_${i}`);
        const bytes = await news_pic.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Store the data or perform any action you need
        // For example, creating directories and saving files
        const timestamp = Date.now();
        const fileName = `${timestamp}_${news_pic.name}`;
        const path = `./uploads/${users.insertId}/${fileName}`;
        const pathPOST = `/uploads/${users.insertId}/${fileName}`;
        await writeFile(path, buffer);
        const newIMG = await query({
          query: `insert into  image_news (news_id,img_path) values (${users.insertId},'${pathPOST}')`,
          values: [],
        });
        // Push the data to the array
      }
    }

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
