import { Router } from "express"
import { createOrder } from "./order.controller.js"

const router = Router()

router.get("/debug", (_, res) => {
    res.send("Order route viva")
})

router.post("/", createOrder)


export default router
