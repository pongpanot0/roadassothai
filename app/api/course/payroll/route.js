import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import nodemailer from "nodemailer";

function imageToBase64(imagePath) {
  // Read image file
  const imageData = fs.readFileSync(imagePath);

  // Convert image data to Base64
  const base64Image = Buffer.from(imageData).toString("base64");

  return base64Image;
}
export async function POST(req) {
  try {
    const body = await req.json();
    const userId = body.user_id;
    if (body.engineers_card) {
      await query({
        query: `UPDATE users SET engineers_card = ? WHERE user_id = ?`,
        values: [body.engineers_card, userId],
      });
    }

    if (body.jobs) {
      await query({
        query: `UPDATE users SET jobs = ? WHERE user_id = ?`,
        values: [body.jobs, userId],
      });
    }

    if (body.department) {
      await query({
        query: `UPDATE users SET department = ? WHERE user_id = ?`,
        values: [body.department, userId],
      });
    }
    const users = await query({
      query:
        "insert into course_enroll (course_id,users_id,enroll_type) values (?,?,?)",
      values: [body.course_id, body.user_id, body.enroll_type],
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
export async function GET(request, res) {
  try {
    const params = request.nextUrl.searchParams.get("foo");

    const users = await query({
      query: `SELECT ce.*,u.*,et.enroll_name,c.course_name,c.course_name_en,c.course_gen,
      c.course_expensesonline,
      c.role_3_expenses,
      c.course_expensesonsite,
      c.course_point,c.course_start,c.course_end 
      from course_enroll ce
      left join users u on (u.user_id = ce.users_id)
      left join enroll_type et on(et.enroll_type = ce.enroll_type)
      left join course c on (c.course_id = ce.course_id)
      where ce.course_enroll_id=${params}`,
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
export async function PUT(request) {
  try {
    const body = await request.json(); // ใช้ formData เพื่อรับข้อมูลรูปภาพ
 

    const users = await query({
      query: `update course_enroll set slip_pic='${body.slips.slips}' where course_enroll_id=${body.id}`,
      values: [],
    });
    const [enrollDetails] = await query({
      query: `
        SELECT 
          c.course_name,
          u.firstname_th,
          u.lastname_th,
          u.user_email,
          ce.course_enroll_id,
          ce.slip_pic,
          ce.enroll_type,
          CASE 
            WHEN ce.enroll_type = 1 THEN c.course_expensesonline
            WHEN ce.enroll_type = 2 THEN c.course_expensesonsite
            WHEN ce.enroll_type = 3 THEN c.role_3_expenses
            ELSE NULL
          END AS course_price
        FROM course_enroll ce
        JOIN course c ON ce.course_id = c.course_id
        JOIN users u ON ce.users_id = u.user_id
        WHERE ce.course_enroll_id = ?
      `,
      values: [body.id],
    });
    const price = enrollDetails.course_price;
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail
      auth: {
        user: "roadsassothai2016@gmail.com", // Your Gmail address
        pass: "imzp lktp slbx qpfe", // Your Gmail app password
      },
    });

    const mailOptions = {
      from: "สมาคมทางหลวงแห่งประเทศไทย <roadsassothai2016@gmail.com>", // Sender
      to: enrollDetails.user_email, // Recipient
      subject: `เรียนคุณ ${enrollDetails.firstname_th} ${enrollDetails.lastname_th}`,
      html: `
        <p>เรียนคุณ ${enrollDetails.firstname_th} ${
        enrollDetails.lastname_th
      },</p>
        <p>ทางสมาคมทางหลวงแห่งประเทศไทยได้รับรายการสมัครหลักสูตรการฝึกอบรมของคุณ</p>
        <ul>
          <li>- ชื่อหลักสูตร: ${enrollDetails.course_name}</li>
        </ul>
        <p>หมายเลขการสมัคร: <strong>${
          enrollDetails.course_enroll_id
        }</strong></p>
        <p>วันที่สมัคร: <strong>${new Date().toLocaleDateString(
          "th-TH"
        )}</strong></p>
        <p>ค่าสมัคร: <strong>${price} บาท</strong></p>
        <p>สถานะ: <strong>รอเจ้าหน้าที่ตรวจสอบการชำระเงิน</strong></p>
        <p><em>หมายเหตุ: โดยทั่วไป เจ้าหน้าที่จะตรวจสอบการชำระเงินภายใน 1-2 วันทำการ</em></p>
        <p>หากมีการเปลี่ยนแปลงแก้ไขกำหนดการ เจ้าหน้าที่จะติดต่อกลับผู้ลงทะเบียนตามข้อมูลที่ให้ไว้</p>
        <p>ติดต่อเจ้าหน้าที่:</p>
        <ul>
          <li>โทรศัพท์: 0-2984-0836 หรือ 089-777-1283 และ 086-344-0555</li>
          <li>Facebook: <a href="https://www.facebook.com/roadassothai">https://www.facebook.com/roadassothai</a></li>
        </ul>
        <p>ขอแสดงความนับถือ,</p>
        <p>สมาคมทางหลวงแห่งประเทศไทย</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export const dynamic = "force-dynamic";
