import { Request, Response } from "express"
import { orm } from "../shared/db/orm.js"
import { Order } from "./order.entity.js"
import { OrderItem } from "./orderItem.entity.js"
import { getNextOrderId } from "../shared/db/getNextOrderId.js"
import { sendOrderEmail } from "../shared/db/sendOrderEmail.js"
import { Product } from "../product/product.entity.js" // Asegurate de tener esta entidad

const em = orm.em

export async function createOrder(req: Request, res: Response) {
  try {
    const {
      name,
      dni,
      address,
      city,
      postalCode,
      phone,
      paymentMethod,
      email,
      items,
    } = req.body

    const order = new Order()
    order.name = name
    order.dni = dni
    order.address = address
    order.city = city
    order.postalCode = postalCode
    order.phone = phone
    order.paymentMethod = paymentMethod

    const emailItems: {
      id: string
      nombre: string
      precio: number
      quantity: number
    }[] = []

    for (const item of items) {
      const product = await em.findOne(Product, { id: item.id })

      if (!product || !product.id) {
        return res.status(404).json({ message: `Producto con ID ${item.id} no encontrado` })
      }

      product.stock -= item.quantity
      em.persist(product)

      const orderItem = new OrderItem()
      orderItem.productId = product.id

      orderItem.quantity = item.quantity
      orderItem.order = order as any
      order.items.add(orderItem)

      // Armar item para el email
      emailItems.push({
        id: product.id!, // 👈 forzamos porque ya chequeamos que `product` existe
        nombre: product.nombre,
        precio: Number(product.precio),
        quantity: item.quantity
      })
      
    }

    const nextOrderId = await getNextOrderId()
    order._id = nextOrderId.toString()

    await em.persistAndFlush(order)

    if (email) {
      await sendOrderEmail(email, {
        orderId: nextOrderId,
        name,
        address,
        city,
        postalCode,
        phone,
        paymentMethod,
        items: emailItems,
      })
    }

    res.status(201).json({
      message: "Orden creada con éxito",
      orderId: nextOrderId,
    })
  } catch (error: any) {
    console.error("❌ ERROR EN BACKEND AL CREAR ORDEN:", error)
    res.status(500).json({
      message: "Error al crear la orden",
      error: error.message,
    })
  }
}
