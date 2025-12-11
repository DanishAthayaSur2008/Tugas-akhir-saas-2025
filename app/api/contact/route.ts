// app/api/contact/route.ts
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // email pengirim
        pass: process.env.EMAIL_PASS, // app password gmail
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "danish.athayan@gmail.com",
      subject: "Pesan Baru dari Website Contact Form",
      text: `
Nama: ${name}
Pesan:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
