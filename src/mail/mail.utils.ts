import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configuración de Nodemailer con Gmail
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Cargado correctamente" : "No cargado");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Tu correo de Gmail
    pass: process.env.EMAIL_PASS, // La contraseña de aplicación
  },
});

// Función para enviar correos
export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Remitente (tu Gmail)
    to, // Destinatario (email del usuario)
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: " + info.response);
    return { success: true, message: "Correo enviado exitosamente" };
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return { success: false, message: "Error al enviar el correo" };
  }
};