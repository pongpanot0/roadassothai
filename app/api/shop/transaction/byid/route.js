import { NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function GET(req, res) {
  try {
    const params = req.nextUrl.searchParams.get("foo");
   
    const users = await query({
      query: `select * from shop_transaction_items where shop_transaction_transaction_id='${params}'`,
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
export const dynamic = 'force-dynamic'