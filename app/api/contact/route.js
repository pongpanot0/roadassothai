import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";
export async function GET(req, res) {
  try {
    const users = await query({
      query: "SELECT * from contact",
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

export async function PUT(req, res) {
    try {
        const body = await req.json()
      const users = await query({
        query: "update contact set contact_th=?, contact_en=?, contact_map=?",
        values: [body.contact_th,body.contact_en,body.contact_map],
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