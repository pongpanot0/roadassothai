import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";
import multer from "multer";
import path from "path";
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
export async function DELETE(req, res) {
  try {
    const body = await req.json();

    const users = await query({
      query: `update shop set isdisbled=? where shop_id=?`,
      values: [body.isdisbled, body.shop_id],
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
export async function GET(req, res) {
  try {
    const users = await query({
      query: `SELECT * from shop where isdisbled='0' order by shop_id desc`,
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
    const formData = await request.formData();

    // Access form fields
    const shop_name = formData.get("shop_name");
    const shop_amount = formData.get("shop_amount");
    const stock = formData.get("stock");
    const shop_detail = formData.get("shop_detail");
    const pic = formData.get("pic");
    const is_preorder = formData.get("is_preorder");

    // Check if there is an uploaded file
    const shop_pic = formData.get("shop_pic"); // This will be the file itself

    // Initial insert into database to get the shop ID
    const insertResult = await query({
      query: `INSERT INTO shop (shop_name, shop_amount, stock, shop_detail,shop_pic,is_preorder) VALUES (?, ?, ?, ?,?,?)`,
      values: [
        shop_name,
        shop_amount,
        stock,
        shop_detail,
        shop_pic,
        is_preorder,
      ],
    });

    const shopId = insertResult.insertId;

    // Define the upload path based on shop ID
    const uploadDir = path.join(process.cwd(), `/uploads/shop/${shopId}`);
    fs.mkdirSync(uploadDir, { recursive: true });

    // Handle file upload if a file is present
    let shop_pic_path = "";
    if (pic && pic.name) {
      const bytes = await pic.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}_${pic.name}`;
      shop_pic_path = `/uploads/shop/${shopId}/${fileName}`;
      const fullPath = path.join(uploadDir, fileName);

      // Write the file to the server
      fs.writeFileSync(fullPath, buffer);

      // Update the database with the path to the uploaded image
      await query({
        query: `UPDATE shop SET shop_sample = ? WHERE shop_id = ?`,
        values: [shop_pic_path, shopId],
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Shop data and file uploaded successfully.",
      shopId,
      shop_pic_path,
    });
  } catch (error) {
    console.error("Error uploading file:", error.message);

    return NextResponse.json({
      status: 400,
      error: error.message,
    });
  }
}
export async function PUT(request) {
  try {
    const formData = await request.formData();

    // Access form fields
    const shop_id = formData.get("shop_id");
    const shop_name = formData.get("shop_name");
    const shop_amount = formData.get("shop_amount");
    const stock = formData.get("stock");
    const shop_detail = formData.get("shop_detail");
    const shop_pic = formData.get("shop_pic"); // This will be a base64 string
    const pic = formData.get("pic"); // PDF file

    const is_preorder = formData.get("is_preorder");

    // Define paths and directories for `pic`
    const uploadDir = path.join(
      process.cwd(),
      `/uploads/shop/${shop_id}`
    );
    fs.mkdirSync(uploadDir, { recursive: true });

    let pic_path = "";

    // Handle `pic` file upload (e.g., PDF)
    if (pic && pic.name) {
      const pdfBytes = await pic.arrayBuffer();
      const pdfBuffer = Buffer.from(pdfBytes);

      const pdfFileName = `${Date.now()}_${pic.name}`;
      pic_path = `/uploads/shop/${shop_id}/${pdfFileName}`;
      const pdfFullPath = path.join(uploadDir, pdfFileName);

      // Write the PDF file to the server
      fs.writeFileSync(pdfFullPath, pdfBuffer);
    }

    // Construct and execute the database update query
    let updateQuery = `
      UPDATE shop SET 
        shop_name = ?,
        shop_amount = ?,
        stock = ?,
        shop_detail = ?,
        is_preorder=?`;

    const params = [shop_name, shop_amount, stock, shop_detail, is_preorder];

    if (shop_pic) {
      updateQuery += `, shop_pic = ?`;
      params.push(shop_pic); // Add base64 string for image
    }

    if (pic_path) {
      updateQuery += `, shop_sample = ?`;
      params.push(pic_path);
    }

    updateQuery += ` WHERE shop_id = ?`;
    params.push(shop_id);

    await query({
      query: updateQuery,
      values: params,
    });

    return NextResponse.json({
      status: 200,
      message: "Shop data and files updated successfully.",
      shopId: shop_id,
      pic_path,
    });
  } catch (error) {
    console.error("Error updating shop data:", error.message);

    return NextResponse.json({
      status: 400,
      error: error.message,
    });
  }
}
