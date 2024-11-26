import { NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function DELETE(request) {
    try {
      const formData = await request.json(); // ใช้ formData เพื่อรับข้อมูลรูปภาพ
        console.log(formData);
        
      const sql = await query({
        query: `delete from course where course_id='${formData}'`,
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
  