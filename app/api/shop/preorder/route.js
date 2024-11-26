import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import dayjs from "dayjs";
import fs from "fs";
import { writeFile } from "fs/promises";
import multer from "multer";
import path from "path";
export async function POST(req, res) {
  try {
    const body = await req.json();

    const users = await query({
      query: `insert into shop_transaction (
  shop_transaction_name,email,line,facebook,phone,is_preorder
        )
        values
        (?,?,?,?,?,?)
        `,
      values: [
        body.shop_transaction_name,
        body.email,
        body.line,
        body.facebook,
        body.phone,
        body.is_preorder,
      ],
    });
    body.shopdetailitem.forEach(async (element) => {
      const shopitems = await query({
        query: `insert into shop_transaction_items (
              shop_transaction_transaction_id,
              shop_transaction_items_name,
              shop_transaction_items_price,
              shop_transaction_items_quatity,
              shop_id
              
              )
              values
              (  ?,?,?,
                  ?,?)
              `,
        values: [
          users.insertId,
          element.itemname,
          element.itemprice,
          element.itemquantity,
          element.id,
        ],
      });
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

export async function GET(req, res) {
  try {
    const users = await query({
      query: `select * from shop_transaction where is_preorder = 1 order by created_at desc`,
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
      query: `update shop_transaction set call_back=1 where shop_transaction_id = ?`,
      values: [body.data.shop_transaction_id],
    });
    body.dataItems.forEach(async (res) => {
  

      const shop = await query({
        query: `update shop set stock=stock-? where shop_id = ?`,
        values: [res.shop_transaction_items_quatity, res.shop_id],
      });
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
