import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";
export async function GET(req, res) {
  try {
    const users = await query({
      query: "SELECT * from about",
      values: [],
    });
    const objective = await query({
      query: "SELECT * from objective",
      values: [],
    });
    const employees = await query({
      query: "SELECT * from employees where isdisbled = 0",
      values: [],
    });

    const data = {
      status: 200,
      data: users,
      objective: objective,
      employees: employees,
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
export async function PUT(req, res) {
  try {
    const body = await req.json();

    const insert = await query({
      query: `update about set about_detail=?, about_detail_en=?
      `,
      values: [body.about_detail, body.about_detail_en],
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
export async function DELETE(req, res) {
  try {
    const body = await req.json();

    const insert = await query({
      query: `update employees set isdisbled=? where employees_id=?
    `,
      values: [body.isdisbled, body.employees_id],
    });

    const data = {
      status: 200,
      data: insert,
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
export async function PATCH(req, res) {
  try {
    const body = await req.json();

    body.forEach(async (element) => {
    
      const insert = await query({
        query: `update objective set objective_name=?, objective_name_en=? where objective_id=?
      `,
        values: [
          element.objective_name,
          element.objective_name_en,
          element.objective_id,
        ],
      });
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
export async function POST(req, res) {
  try {
    const body = await req.json();

    const insert = await query({
      query: `insert into employees 
        (
          employees_prefix_en,
        employees_prefix,
        employees_firstname,
        employees_lastname,
        employees_job,
        employees_firstname_en,
        employees_lastname_en,
        employees_pic,
        level
        )
        values 
        (
          '${body.employees_prefix_en}',
          '${body.employees_prefix}',
          '${body.employees_firstname}',
          '${body.employees_lastname}',
          '${body.employees_job}',
          '${body.employees_firstname_en}',
          '${body.employees_lastname_en}',
          '${
            body.employees_pic ??
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png"
          }',
          '${body.level}'
          )
      `,
      values: [],
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
