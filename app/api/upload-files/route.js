import fs from 'fs';
import path from 'path';

export async function GET(req) {
    // เส้นทางไปยังโฟลเดอร์ uploads ใน public
    const directoryPath = path.join(process.cwd(), '/uploads');

    try {
        // อ่านไฟล์ในโฟลเดอร์
        const files = fs.readdirSync(directoryPath);

        // ส่งรายชื่อไฟล์กลับในรูป JSON
        return new Response(JSON.stringify({ files }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error reading files:', error);

        return new Response(JSON.stringify({ error: 'Error reading files' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
