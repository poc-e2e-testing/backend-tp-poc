import { Request, Response } from "express"
import { orm } from "../shared/db/orm.js"
import { Order } from "./order.entity.js"
import { OrderItem } from "./orderItem.entity.js"
import { getNextOrderId } from "../shared/db/getNextOrderId.js"
import { sendOrderEmail } from "../shared/db/sendOrderEmail.js"
import { Product } from "../product/product.entity.js"
import { Client } from "../client/client.entity.js"
import { Reference } from "@mikro-orm/core"

interface AuthenticatedRequest extends Request {
  user?: Client
}

export async function createOrder(req: AuthenticatedRequest, res: Response) {
  const em = orm.em.fork()

  try {
    const client = req.user
    if (!client || !client.id) {
      return res.status(401).json({ message: "Cliente no autenticado" })
    }

    const {
      name,
      dni,
      address,
      city,
      postalCode,
      phone,
      paymentMethod,
      items,
    } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "La orden no contiene productos" })
    }

    const order = new Order()
    const nextOrderId = await getNextOrderId()
    order._id = nextOrderId.toString() // ✅ se asigna antes del Reference.create

    order.name = name
    order.dni = dni
    order.address = address
    order.city = city
    order.postalCode = postalCode
    order.phone = phone
    order.paymentMethod = paymentMethod
    order.client = Reference.create(client)

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

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.nombre}` })
      }

      product.stock -= item.quantity
      em.persist(product)

      const orderItem = new OrderItem()
      orderItem.productId = product.id
      orderItem.quantity = item.quantity
      orderItem.order = Reference.create(order)
      order.items.add(orderItem)

      emailItems.push({
        id: product.id,
        nombre: product.nombre,
        precio: Number(product.precio),
        quantity: item.quantity
      })
    }

    await em.persistAndFlush(order)

    if (client.email) {
      try {
        await sendOrderEmail(client.email, {
          orderId: nextOrderId,
          name,
          address,
          city,
          postalCode,
          phone,
          paymentMethod,
          items: emailItems,
        })
      } catch (mailErr) {
        console.warn("⚠️ Error al enviar el correo:", mailErr)
      }
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

export async function getOrdersByClient(req: AuthenticatedRequest, res: Response) {
  const em = orm.em.fork()

  try {
    const client = req.user
    if (!client || !client.id) {
      return res.status(401).json({ message: "No autorizado" })
    }

    const orders = await em.find(Order, { client: client.id }, {
      populate: ['items'],
      orderBy: { createdAt: 'DESC' }
    })

    return res.status(200).json({
      message: "Órdenes recuperadas correctamente",
      data: orders
    })

  } catch (error: any) {
    console.error("❌ Error al obtener órdenes:", error)
    return res.status(500).json({ message: "Error al recuperar órdenes" })
  }
}
