import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";
export async function GET(req, res) {
  try {
    const users = await query({
      query: "SELECT * from course order by course_id desc",
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
    const body = await request.json(); // ใช้ formData เพื่อรับข้อมูลรูปภา
    const {
      course_start,
      course_end,
      course_point,
      course_name,
      course_name_en,
      course_gen,
      course_expensesonline,
      course_expensesonsite,
      course_lecturer,
      course_enroll,
      role_3_expenses,
      corse_type,
    } = body.coursedetail;

    const users = await query({
      query: `insert into course (
        course_start,
        course_end,
        course_point,
        course_name,
        course_name_en,
        course_gen,
        course_expensesonline,
        course_expensesonsite,
        course_lecturer,
        course_enroll,
        role_3_expenses,
        corse_type
      ) values (?,?,?,?,?,?,?,?,?,?,?,?)
      `,
      values: [
        course_start,
        course_end,
        course_point,
        course_name,
        course_name_en,
        course_gen,
        course_expensesonline,
        course_expensesonsite,
        course_lecturer,
        course_enroll,
        role_3_expenses,
        corse_type,
      ],
    });
    body.objectives.forEach(async (element) => {
      const course_objective = await query({
        query: `insert into course_objective (
          course_objective_name,
          course_objective_name_eng,
          course_id
         ) values (?,?,?)
        `,
        values: [
          element.name.toString(),
          element.name_en.toString(),
          users.insertId,
        ],
      });
    });
    body.Learningob.forEach(async (element) => {
      const course_topic = await query({
        query: `insert into course_topic (
          course_topic_name,
          course_topic_name_eng,
          course_id
         ) values (?,?,?)
        `,
        values: [
          element.name.toString(),
          element.name_en.toString(),
          users.insertId,
        ],
      });
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
    const formData = await request.formData(); // ใช้ formData เพื่อรับข้อมูลรูปภาพ

    const news_pic = formData.get("course_promopic");
    const id = formData.get("id");
    if (news_pic !== null) {
      const bytes = await news_pic.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const timestamp = Date.now();
      const fileName = `${timestamp}_${news_pic.name}`;
      const newsPath = `./uploads/course/${id}`;
      fs.mkdirSync(newsPath, { recursive: true });
      const path = `./uploads/course/${id}/${fileName}`;
      const pathPOST = `/uploads/course/${id}/${fileName}`;
      await writeFile(path, buffer);
      const update = await query({
        query: `update course set course_promopic='${pathPOST}' where course_id = ${id}
      `,
        values: [pathPOST, id],
      });
      const data = {
        status: 200,
        data: update,
      };
      return NextResponse.json(data);
    }
  } catch (error) {
    const data = {
      status: 400,
      data: error.message,
    };
    return NextResponse.json(data);
  }
}
export async function PATCH(request) {
  try {
    const formData = await request.formData(); // ใช้ formData เพื่อรับข้อมูลรูปภาพ

    const id = formData.get("id");
    const news_pic_length = formData.get("news_pic_length");
    if (news_pic_length > 0) {
      for (let i = 0; i < news_pic_length; i++) {
        const news_pic = formData.get(`news_pic_${i}`);
        const bytes = await news_pic.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const fileName = `${timestamp}_${news_pic.name}`;
        const path = `./uploads/course/${id}/${fileName}`;
        const pathPOST = `/uploads/course/${id}/${fileName}`;
        await writeFile(path, buffer);
        const newIMG = await query({
          query: `insert into  image_course (course_id,image_course_pic) values (${id},'${pathPOST}')`,
          values: [],
        });
        // Push the data to the array
      }
    }
    const data = {
      status: 200,
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
    const formData = await request.json(); // ใช้ formData เพื่อรับข้อมูลรูปภาพ

    const sql = await query({
      query: `update course set active=${formData.active} where course_id=${formData.id}`,
      values: [],
    });
    const data = {
      status: 200,
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
