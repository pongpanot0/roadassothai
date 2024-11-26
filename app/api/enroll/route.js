import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import nodemailer from "nodemailer"; 
export async function POST(request, res) {
  try {
    const params = request.nextUrl.searchParams.get("foo");

    const users = await query({
      query: `SELECT ce.*,u.*,et.enroll_name,c.course_name,c.course_name_en,
      c.course_promopic,
      c.course_gen,
      c.course_expensesonline,
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
export async function GET(request, res) {
  try {
    const params = request.nextUrl.searchParams.get("foo");

    const users = await query({
      query: `SELECT ce.*,u.*,et.enroll_name,c.course_name,c.course_name_en,c.course_gen,
      c.course_expensesonline,
      c.course_expensesonsite,
      c.course_point,c.course_start,c.course_end 
      from course_enroll ce
      left join users u on (u.user_id = ce.users_id)
      left join enroll_type et on(et.enroll_type = ce.enroll_type)
      left join course c on (c.course_id = ce.course_id)
      where ce.course_id=${params}`,
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
export async function PUT(request, res) {
  try {
    const body = await request.json();
    const course_enroll = await query({
      query: `update course_enroll set accepted=1,accepted_by=1 where course_enroll_id=${body}`,
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
      values: [body],
    });
  
    
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail
      auth: {
        user: "roadsassothai2016@gmail.com", // Your Gmail address
        pass: "imzp lktp slbx qpfe", // Your Gmail app password
      },
    });

    // Step 4: Prepare and send the email
    const mailOptions = {
      from: "สมาคมทางหลวงแห่งประเทศไทย <roadsassothai2016@gmail.com>",
      to: enrollDetails.user_email,
      subject: `เรียนคุณ ${enrollDetails.firstname_th} ${enrollDetails.lastname_th}`,
      html: `
        <p>เรียนคุณ ${enrollDetails.firstname_th} ${enrollDetails.lastname_th},</p>
        <p>ทางสมาคมทางหลวงแห่งประเทศไทยได้รับรายการสมัครหลักสูตรการฝึกอบรมของคุณ</p>
        <ul>
          <li><strong>ชื่อหลักสูตร:</strong> ${enrollDetails.course_name}</li>
          <li><strong>หมายเลขการสมัคร:</strong> ${enrollDetails.course_enroll_id}</li>
          <li><strong>วันที่สมัคร:</strong> ${new Date().toLocaleDateString("th-TH")}</li>
          <li><strong>ค่าสมัคร:</strong> ${enrollDetails.course_price} บาท</li>
        </ul>
        <p><strong>สถานะ:</strong> ยืนยันการชำระเงิน</p>
        <p><em>หมายเหตุ: หากมีการเปลี่ยนแปลงแก้ไขกำหนดการ เจ้าหน้าที่จะติดต่อกลับผู้ลงทะเบียนตามข้อมูลที่ให้ไว้</em></p>
        <p>ติดต่อเจ้าหน้าที่:</p>
        <ul>
          <li>โทรศัพท์: 0-2984-0836 หรือ 089-777-1283 และ 086-344-0555</li>
          <li>Facebook: <a href="https://www.facebook.com/roadassotha">https://www.facebook.com/roadassotha</a></li>
        </ul>
        <p>ขอแสดงความนับถือ,</p>
        <p>สมาคมทางหลวงแห่งประเทศไทย</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    const data = {
      status: 200,
      data: course_enroll,
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
export async function PATCH(request, res) {
  try {
    const body = await request.json();
    
    const course_enroll = await query({
      query: `update course_enroll set engineer_num='${body.engineernum}',is_pass=1 where course_enroll_id=${body.course_enroll_id}`,
      values: [],
    });
    const data = {
      status: 200,
      data: course_enroll,
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