import nodemailer from "nodemailer"

interface OrderEmailData {
  orderId: number
  name: string
  address: string
  phone: string
  paymentMethod: string
}

export async function sendOrderEmail(to: string, orderInfo: OrderEmailData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const html = `
    <h2>Gracias por tu compra, ${orderInfo.name}</h2>
    <p><strong>N° de Orden:</strong> ${orderInfo.orderId}</p>
    <p><strong>Dirección:</strong> ${orderInfo.address}</p>
    <p><strong>Teléfono:</strong> ${orderInfo.phone}</p>
    <p><strong>Pago:</strong> ${orderInfo.paymentMethod}</p>
  `

  await transporter.sendMail({
    from: `"Don Julio Store" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Confirmación de orden N°${orderInfo.orderId}`,
    html
  })
  
}