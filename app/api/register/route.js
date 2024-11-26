import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import nodemailer from "nodemailer";
const sendEmail = async (userEmail, userName) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail
      auth: {
        user: "roadsassothai2016@gmail.com", // Your Gmail address
        pass: "imzp lktp slbx qpfe", // Your Gmail app password
      },
    });

    // Email options
    const mailOptions = {
      from: "สมาคมทางหลวงแห่งประเทศไทย <roadsassothai2016@gmail.com>",
      to: userEmail,
      subject: "ยินดีต้อนรับสู่เว็ปไซต์ สมาคมทางหลวงแห่งประเทศไทย",
      html: `<p>สวัสดีคุณ  ${userName}</p>
             <p>ขอบคุณที่สมัครสมาชิกกับทางเรา</p>
             <p>ขอแสดงความนับถือ</p>
             <p>สมาคมทางหลวงแห่งประเทศไทย</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);

    const check = await query({
      query: `select count(*) as check_count from users where user_name=?`,
      values: [body.user_name],
    });
    if (check[0]?.check_count > 0) {
      const data = {
        status: 201,
      };
      return NextResponse.json(data);
    } else {
      const users = await query({
        query: `
          SELECT membernumber 
          FROM users 
          ORDER BY membernumber DESC 
          LIMIT 1
        `,
        values: [],
      });

      let newNumberRegister = "M0001";

      // Generate the next `membernumber` value
      if (users.length > 0 && users[0].membernumber) {
        const lastNumber = parseInt(users[0].membernumber.slice(1)); // Extract the numeric part
        const nextNumber = lastNumber + 1;
        newNumberRegister = `M${nextNumber.toString().padStart(4, "0")}`; 
        console.log(newNumberRegister);
        
      }

      const newUser = await query({
        query: `insert into users 
        ( 
        membernumber,
        user_name,
          user_password,
          user_email,
          role,
          firstname_th,
          lastname_th,
          firstname_en,
          lastname_en,
          line,
          initial_name,
          initial_name_en,
          phone
          ) 
          values 
          (
          '${newNumberRegister}'
          ,'${body.user_name}'
          ,'${body.user_password}'
          ,'${body.user_email}'
          ,'${body.role}'
          ,'${body.firstname_th}'
          ,'${body.lastname_th}'
          ,'${body.firstname_en}'
          ,'${body.lastname_en}'
          ,'${body.line}'
          ,'${body.initial_name}'
          ,'${body.initial_name_en}'
          ,'${body.phone}'
          )`,
        values: [],
      });
      await sendEmail(body.user_email, body.firstname_th);
      const data = {
        status: 200,
        data: users,
      };
      return NextResponse.json(data);
    }
  } catch (error) {
    console.log(error.message);

    const data = {
      status: 400,
      data: error.message,
    };
    return NextResponse.json(data);
  }
}
