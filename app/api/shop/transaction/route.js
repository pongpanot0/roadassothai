import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import nodemailer from "nodemailer";
const sendEmail = async (userEmail, userName, orderDetails) => {
  try {
    const { orderNumber, orderDate, totalPrice, items, status } = orderDetails;

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
      subject: `เรียนคุณ ${userName}`,
      html: `
        <p>เรียนคุณ ${userName},</p>
        <p>ทางสมาคมทางหลวงแห่งประเทศไทยได้รับคำสั่งซื้อของท่าน</p>
        <ul>
          ${items
            .map(
              (item) =>
                `<li>${item.name} จำนวน ${item.quantity} เล่ม ราคา ${item.price} บาท</li>`
            )
            .join("")}
        </ul>
        <p>หมายเลขคำสั่งซื้อ: <strong>${orderNumber}</strong></p>
        <p>วันที่สั่งซื้อ: <strong>${orderDate}</strong></p>
        <p>ราคารวม: <strong>${totalPrice} บาท</strong></p>
        <p>สถานะ: <strong>${status}</strong></p>
        <p><em>หมายเหตุ: โดยทั่วไป เจ้าหน้าที่จะตรวจสอบการชำระเงินและจัดส่งพัสดุภายใน 1-3 วันทำการ</em></p>
        <p>ติดต่อเจ้าหน้าที่:</p>
        <ul>
          <li>โทรศัพท์: 0-2984-0836 หรือ 089-777-1283 และ 086-344-0555</li>
          <li>Facebook: <a href="https://www.facebook.com/roadassotha">https://www.facebook.com/roadassotha</a></li>
        </ul>
        <p>ขอแสดงความนับถือ,</p>
        <p>สมาคมทางหลวงแห่งประเทศไทย</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

async function sendEmailSlips(orderDetails) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail
      auth: {
        user: "roadsassothai2016@gmail.com", // Your Gmail address
        pass: "imzp lktp slbx qpfe", // Your Gmail app password
      },
    });

    const mailOptions = {
      from: "สมาคมทางหลวงแห่งประเทศไทย <roadsassothai2016@gmail.com>",
      to: orderDetails.email,
      subject: `เรียนคุณ ${orderDetails.customerName}`,
      html: `
        <p>เรียนคุณ ${orderDetails.customerName},</p>
        <p>ทางสมาคมทางหลวงแห่งประเทศไทยได้รับคำสั่งซื้อของท่าน</p>
        <ul>
          ${orderDetails.items
            .map(
              (item) =>
                `<li>- ${item.itemName} จำนวน ${item.quantity}  (${item.price} บาท)</li>`
            )
            .join("")}
        </ul>
        <p>หมายเลขคำสั่งซื้อ: <strong>${orderDetails.orderNumber}</strong></p>
        <p>วันที่สั่งซื้อ: <strong>${orderDetails.orderDate}</strong></p>
        <p>ราคารวม: <strong>${orderDetails.totalPrice} บาท</strong></p>
        <p>สถานะการชำระเงิน: <strong>ยืนยันการชำระเงิน</strong></p>
        <p>สถานการณ์จัดส่ง: <strong>จัดส่งโดย ${
          orderDetails.deliveryBy
        } หมายเลขติดตามพัสดุ ${
        orderDetails.trackingNumber || "ไม่มี"
      }</strong></p>
        <p>ติดต่อเจ้าหน้าที่:</p>
        <ul>
          <li>โทรศัพท์: 0-2984-0836 หรือ 089-777-1283 และ 086-344-0555</li>
          <li>Facebook: <a href="https://www.facebook.com/roadassothai">https://www.facebook.com/roadassothai</a></li>
        </ul>
        <p>ขอแสดงความนับถือ,</p>
        <p>สมาคมทางหลวงแห่งประเทศไทย</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();

    const users = await query({
      query: `insert into shop_transaction (
shop_transaction_name,shop_transaction_address_num,shop_transaction_address_sub_district,
shop_transaction_address_district,shop_transaction_address_province,shop_transaction_address_zipcode,
shop_transaction_address_slip,email,line,facebook,phone
      )
      values
      (?,?,?,?,?,?,?,?,?,?,?)
      `,
      values: [
        body.shop_transaction_name,
        body.shop_transaction_address_num,
        body.shop_transaction_address_sub_district,
        body.shop_transaction_address_district,
        body.shop_transaction_address_province,
        body.shop_transaction_address_zipcode,
        body.shop_transaction_address_slip,
        body.email,
        body.line,
        body.facebook,
        body.phone,
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
    const items = body.shopdetailitem.map((element) => ({
      name: element.itemname,
      quantity: element.itemquantity,
      price: element.itemprice,
    }));
    const totalPrice =
      items.reduce((total, item) => total + item.price * item.quantity, 0) + 50;
    const orderDate = new Date().toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const orderDetails = {
      orderNumber: users.insertId,
      orderDate: orderDate,
      totalPrice: totalPrice,
      items: items, // Array of all items
      status: "รอเจ้าหน้าที่ตรวจสอบการชำระเงิน",
    };

    await sendEmail(body.email, body.shop_transaction_name, orderDetails);
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
      query: `select * from shop_transaction where is_preorder = 0 order by created_at desc`,
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
    const body = await req.json();

    const users = await query({
      query: `update shop_transaction set slip_accept=1,delivery_by=?,numberpack=? where shop_transaction_id = ?`,
      values: [
        body.AcceptSlipDetails.delivery_by,
        body.AcceptSlipDetails.numberpack,
        body.data.shop_transaction_id,
      ],
    });
    body.dataItems.forEach(async (res) => {
      const shop = await query({
        query: `update shop set stock=stock-? where shop_id = ?`,
        values: [res.shop_transaction_items_quatity, res.shop_id],
      });
    });
    const totalPrice = body.dataItems.reduce(
      (sum, item) =>
        sum +
        item.shop_transaction_items_quatity * item.shop_transaction_items_price,
      0
    );
    const orderDetails = {
      email: body.data.email,
      customerName: body.data.shop_transaction_name,
      orderNumber: body.data.shop_transaction_id,
      orderDate: new Date().toLocaleDateString("th-TH"),
      totalPrice: totalPrice,
      deliveryBy: body.AcceptSlipDetails.delivery_by,
      trackingNumber: body.AcceptSlipDetails.numberpack,
      items: body.dataItems.map((item) => ({
        itemName: item.shop_transaction_items_name,
        quantity: item.shop_transaction_items_quatity,
        price: item.shop_transaction_items_price,
      })),
    };
    await sendEmailSlips(orderDetails);
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
