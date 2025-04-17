import nodemailer from "nodemailer"

interface OrderItem {
  id: string
  nombre: string
  precio: number
  quantity: number
}

interface OrderEmailData {
  orderId: number
  name: string
  address: string
  city?: string
  postalCode?: string
  phone: string
  paymentMethod: string
  items: OrderItem[]
}

export async function sendOrderEmail(to: string, orderInfo: OrderEmailData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const itemsHtml = orderInfo.items.map(item => `
    <tr>
      <td>${item.nombre}</td>
      <td style="text-align: center;">${item.quantity}</td>
      <td style="text-align: right;">$${(item.precio * item.quantity).toFixed(2)}</td>
    </tr>
  `).join("")

  const total = orderInfo.items.reduce((acc, item) => acc + item.precio * item.quantity, 0)

  const html = `
    <h2>Gracias por tu compra, ${orderInfo.name} 🛍️</h2>
    <p>Tu orden <strong>#${orderInfo.orderId}</strong> fue procesada con éxito.</p>

    <h3>🧾 Detalle de productos</h3>
    <table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; font-family: sans-serif; font-size: 14px;">
      <thead style="background-color: #f5f5f5;">
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
        <tr>
          <td colspan="2" style="text-align: right;"><strong>Total:</strong></td>
          <td style="text-align: right;"><strong>$${total.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table>

    <h4>📦 Envío</h4>
    <p>
      Dirección: ${orderInfo.address}<br/>
      Ciudad: ${orderInfo.city || "No especificada"}<br/>
      Código postal: ${orderInfo.postalCode || "No especificado"}<br/>
      Teléfono: ${orderInfo.phone}
    </p>

    <p><strong>Método de pago:</strong> ${orderInfo.paymentMethod}</p>

    <p style="margin-top: 20px;">Nos pondremos en contacto pronto con los detalles del envío. ¡Gracias por confiar en Don Julio Store!</p>
    <hr/>
    <p style="font-size: 12px; color: gray;">Este es un mensaje automático. No respondas a este correo.</p>
  `

  await transporter.sendMail({
    from: `"Don Julio Store" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🧾 Confirmación de orden #${orderInfo.orderId}`,
    html
  })
}
