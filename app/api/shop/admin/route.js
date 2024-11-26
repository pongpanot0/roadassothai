import { NextResponse } from "next/server";
import { query } from "@/lib/db";
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
      query: `SELECT * from shop order by shop_id desc`,
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
    const body = await request.json();
  

    const users = await query({
      query: `insert into shop (shop_name,shop_amount,shop_pic,stock,shop_detail) values 
      
      
('${body.shop_name}','${body.shop_amount}','${body.shop_pic}','${body.stock}','${body.shop_detail}')`,
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
export async function PUT(request) {
  try {
    const body = await request.json();
    

     const users = await query({
      query: `
      update shop set shop_name='${body.shop_name}',
      shop_amount='${body.shop_amount}',
      stock='${body.stock}',
      shop_detail='${body.shop_detail}',
      shop_pic='${body.shop_pic}'
      where shop_id='${body.shop_id}'`,
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
