import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
    const { path: filePathArray } = params; // Dynamic Route ให้ค่ามาเป็น Array
    if (!filePathArray || filePathArray.length === 0) {
        return new Response("Invalid path", { status: 400 });
    }

    // สร้าง path สำหรับไฟล์
    const filePath = path.join(process.cwd(), ...filePathArray);

    
    try {
        // ตรวจสอบว่าไฟล์มีอยู่จริง
        if (!fs.existsSync(filePath)) {
            return new Response("File not found", { status: 404 });
        }

        // อ่านเนื้อหาไฟล์
        const fileContent = fs.readFileSync(filePath);

        // กำหนด Content-Type โดยอัตโนมัติ
        const contentType = getContentType(filePath);

        return new Response(fileContent, {
            status: 200,
            headers: {
                "Content-Type": contentType,
            },
        });
    } catch (error) {
        console.error("Error reading file:", error);
        return new Response("Error reading file", { status: 500 });
    }
}

// Helper function: ระบุ Content-Type ตามชนิดของไฟล์
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case ".txt":
            return "text/plain";
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        case ".png":
            return "image/png";
        case ".pdf":
            return "application/pdf";
        default:
            return "application/octet-stream"; // Default สำหรับไฟล์อื่น ๆ
    }
}
