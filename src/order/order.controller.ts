import { Request, Response } from "express"
import { orm } from "../shared/db/orm.js"
import { Order } from "./order.entity.js"
import { OrderItem } from "./orderItem.entity.js"
import { getNextOrderId } from "../shared/db/getNextOrderId.js"
import { sendOrderEmail } from "../shared/db/sendOrderEmail.js"


const em = orm.em

export async function createOrder(req: Request, res: Response) {



  try {
    const { name, address, phone, paymentMethod,email, items } = req.body

    const order = new Order()
    order.name = name
    order.address = address
    order.phone = phone
    order.paymentMethod = paymentMethod
    order.email = email

    items.forEach((item: { id: string; quantity: number }) => {
        const orderItem = new OrderItem()
        orderItem.productId = item.id
        orderItem.quantity = item.quantity
        orderItem.order = order
        order.items.add(orderItem)
    })
  
    const nextOrderId = await getNextOrderId()
    order._id = nextOrderId.toString() // si _id es string, si es number no hace falta


  

    await em.persistAndFlush(order)

    if (email) {
      await sendOrderEmail(email, {
        orderId: nextOrderId,
        name,
        address,
        phone,
        paymentMethod
      })
    }
    
    

    res.status(201).json({
      message: "Orden creada con éxito",
      orderId: nextOrderId,
    })
  } catch (error: any) {
    res.status(500).json({ message: "Error al crear la orden", error: error.message })
  }
}
