import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";
export async function PUT(req, res) {
  try {
    const body = await req.json();
    const insert = await query({
      query: `update employees set 
      employees_prefix_en=?,
      employees_prefix=?,
      employees_firstname=?,
      employees_lastname=?,
      employees_job=?,
      employees_job_en=?,
      employees_firstname_en=?,
      employees_lastname_en=?,
      employees_pic=?,
      level=?
      where employees_id=?
        `,
      values: [
        body.employees_prefix_en,
        body.employees_prefix,
        body.employees_firstname,
        body.employees_lastname,
        body.employees_job,
        body.employees_job_en,
        body.employees_firstname_en,
        body.employees_lastname_en,
        body.employees_pic,
        body.level,
        body.employees_id,
      ],
    });
    const data = {
      status: 200,
      data: insert,
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
