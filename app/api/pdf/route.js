import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { PDFDocument, StandardFonts, rgb, PageSizes } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import dayjs from "dayjs";
import 'dayjs/locale/th'
import buddhistEra from "dayjs/plugin/buddhistEra";
const fs = require("fs");
dayjs.extend(buddhistEra); //
export async function POST(req, res) {
  try {
    dayjs.locale("th");
    const body = await req.json();
    const pdfDoc = await PDFDocument.create();

    const url = "https://script-app.github.io/font/THSarabunNew.ttf";
    const fontBytes = await fetch(url).then((res) => res.arrayBuffer());
    pdfDoc.registerFontkit(fontkit);
    // Add a blank page to the document
    const page = pdfDoc.addPage([PageSizes.A4[1], PageSizes.A4[0]]);

    // Get the width and height of the page
    const { width, height } = page.getSize();

    // Draw a string of text toward the top of the page

    const imgBytes = fs.readFileSync("./public/border.png"); // Change the path to your image file

    const img = await pdfDoc.embedPng(imgBytes); // You can also use embedJpg for JPG images

    // Set the image as the background of the page
    page.drawImage(img, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
    });

    const font = await pdfDoc.embedFont(fontBytes);
    const fontSize = 32;
    const nameth = `${body.firstname_th}  ${body.lastname_th}`;
    const nameen = `${body.firstname_en}  ${body.lastname_en}`;

    const textHeight = font.heightAtSize(fontSize);
    page.drawText("ได้รับการรับรองจากสภาวิศวกร", {
      x: 80,
      y: 520,
      lineHeight: 24,
      size: 20,
      font: font,
      color: rgb(0, 0, 0), // Set text color (white in this case)
    });
    const activitycode = `รหัสกิจกรรม ${body.engineer_num}`;
    const widthTextactivity = font.widthOfTextAtSize(activitycode, 20);
    page.drawText(activitycode, {
      x: 550 + widthTextactivity / 2,
      y: 520,
      lineHeight: 24,
      size: 20,
      font: font,
      color: rgb(0, 0, 0), // Set text color (white in this case)
      textAlign: "center", // กำหนดให้ข้อความอยู่ตรงกลาง
    });
    
    page.drawText(`ให้มีจำนวนหน่วยพัฒนา ${body.course_point} หน่วย`, {
      x: 80,
      y: 500,
      lineHeight: 24,
      size: 20,
      font: font,
      color: rgb(0, 0, 0), // Set text color (white in this case)
    });
    page.drawText(nameth, {
      x: 330,
      y: 380,
      lineHeight: 24,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0), // Set text color (white in this case)
    });
    page.drawText(nameen, {
      x: 310,
      y: 350, // Adjusted the text position to be below the center
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0), // Set text color (white in this case)
    });
    const passtext = `ผ่านการฝึกอบรมหลักสูตร "${body.course_name}" รุ่นที่ ${body.course_gen}`;
    const widthText = font.widthOfTextAtSize(passtext, 22);

    page.drawText(passtext, {
      x: 0 + widthText / 2,
      y: 315, // Adjusted the text position to be below the center
      size: 22,
      font: font,
      color: rgb(0, 0, 0), // Set text color (white in this case)
      textAlign: "center", // กำหนดให้ข้อความอยู่ตรงกลาง
    });
    page.drawText(`has successfully completed the training course on`, {
      x: 275,
      y: 290, // Adjusted the text position to be below the center
      size: 22,
      font: font,
      color: rgb(0, 0, 0), // Set text color (white in this case)
    });
    const passtexten = `"${body.course_name_en}"`;
    const widthTexten = font.widthOfTextAtSize(passtexten, 22);

    page.drawText(passtexten, {
      x: 150 + widthTexten / 2,
      y: 265, // Adjusted the text position to be below the center
      size: 22,
      font: font,
      color: rgb(0, 0, 0), // Set text color (white in this case)
    });
    const DateLongEN = (date) => {
      dayjs.locale("en");
      return dayjs(date).format("MMMM");
    };
    const startDate = dayjs(body.course_start).format('DD')
    const endDate = dayjs(body.course_end).format('DD')
    const year = dayjs(body.course_end).format('YYYY')
    const month = dayjs(body.course_end).format('MMMM')
    const yearth = dayjs(body.course_end).format('BBBB')
    
    page.drawText(
      `ระหว่างวันที่ ${startDate} - ${endDate} ${month} ${yearth} จัดโดย สมาคมทางหลวงแห่งประเทศไทย`,
      {
        x: 205,
        y: 240, // Adjusted the text position to be below the center
        size: 22,
        font: font,
        color: rgb(0, 0, 0), // Set text color (white in this case)
      }
    );
    page.drawText(
      `organized by the Roads Association of Thailand dated ${startDate} - ${endDate} ${DateLongEN(body.course_end)}, ${year}`,
      {
        x: 210,
        y: 215, // Adjusted the text position to be below the center
        size: 19,
        font: font,
        color: rgb(0, 0, 0), // Set text color (white in this case)
      }
    );
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    const pdfBinary = Buffer.from(pdfBytes).toString("base64");
    return NextResponse.json(pdfBinary);
  } catch (error) {
   
    const data = {
      status: 400,
      data: error.message,
    };
    return NextResponse.json(data);
  }
}
