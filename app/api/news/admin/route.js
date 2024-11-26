import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { writeFile } from "fs/promises";
import multer from "multer";
import fs from "fs";
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
    const formData = await request.formData();
    const news_desc = formData.get("news_desc"); // ดึงค่า news_desc จาก formData
    const news_title = formData.get("news_title"); // ดึงค่า news_title จาก formData
    const news_desc_en = formData.get("news_desc_en"); // ดึงค่า news_desc จาก formData
    const news_title_en = formData.get("news_title_en"); // ดึงค่า news_title จาก formData
    const pic_column = formData.get("pic_column");
    const news_id = formData.get("news_id");
    const isnewpic = formData.get("isnewpic");
    const news_pic = formData.get("news_pic");; // Use req.file to get the uploaded file

    
    const users = await query({
      query: `update news set  news_desc='${news_desc}' 
        ,news_desc_en='${news_desc_en}' 
        ,news_title='${news_title}' 
        ,news_title_en='${news_title_en}' 
        where
        news_id = '${news_id}'`,
      values: [],
    });
   
    if (isnewpic == "true") {
      const bytes = await news_pic.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const timestamp = Date.now();
      const fileName = `${timestamp}_${news_pic.name}`;
      const newsPath = `./uploads/${news_id}`;
      fs.mkdirSync(newsPath, { recursive: true });
      const path = `./uploads/${news_id}/${fileName}`;
      const pathPOST = `/uploads/${news_id}/${fileName}`;
      await writeFile(path, buffer);
      const update = await query({
        query: `update news set news_pic='${pathPOST}' where news_id = ${news_id} 
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
        const path = `./uploads/${news_id}/${fileName}`;
        const pathPOST = `/uploads/${news_id}/${fileName}`;
        await writeFile(path, buffer);
        const newIMG = await query({
          query: `insert into  image_news (news_id,img_path) values (${news_id},'${pathPOST}')`,
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
    console.log(error.message);

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
      query: `update image_news set active=? where news_img_id=?`,
      values: [body.active, body.news_img_id],
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
      query: `SELECT * from image_news where news_id = ${params}   order by img_index desc`,
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
export async function PUT(req, res) {
  try {
    const body = await req.json();

    const users = await query({
      query: `update news set active=? where news_id=?`,
      values: [body.active, body.news_id],
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
