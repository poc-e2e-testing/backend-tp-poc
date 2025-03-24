import express from "express";
import { sendEmail } from "./mail.utils.js";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Correo electrónico requerido" });
  }

  const response = await sendEmail(
    email,
    "¡Gracias por suscribirte!",
    "Bienvenido a nuestro newsletter. ¡Gracias por suscribirte!"
  );

  if (response.success) {
    res.status(200).json({ message: response.message });
  } else {
    res.status(500).json({ error: response.message });
  }
});

export default router;