import { Router } from "express"
import { createOrder } from "./order.controller.js"
import { verifyToken } from "../auth/auth.middleware.js"
import { getOrdersByClient } from "./order.controller.js"

const router = Router()

router.get("/debug", (_, res) => {
    res.send("Order route viva")
})

router.post("/", verifyToken, createOrder)
router.get("/my-orders", verifyToken, getOrdersByClient)
router.get("/my-orders/:id", verifyToken, getOrdersByClient)

export default router
