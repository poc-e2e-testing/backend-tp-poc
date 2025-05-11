import 'reflect-metadata';
import express from 'express';
import { clientRouter } from './client/client.routes.js';
import { productRouter } from './product/product.routes.js';
import { clientClassRouter } from './client/clientClass.routes.js';
import { productBrandRouter } from './product/productBrand.routes.js';
import { productClassRouter } from './product/productClass.routes.js';
import authRoutes from './auth/auth.routes.js';
import {orm, syncSchema} from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import cors from 'cors';
import mailRouter from './mail/mail.routes.js';
import orderRouter from "./order/order.routes.js";
import dotenv from "dotenv"
dotenv.config()



// antes de las rutas y middleware de negocio
const app = express();
app.use(express.json());

const allowedOrigins = [
  'https://frontend-donjulio.onrender.com',
  'http://localhost:5173',
  'https://front-end-dsw.vercel.app/'
];

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://front-end-dsw.vercel.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
//luego de los middleware base como express.json()
app.use((req, res, next) => {
    RequestContext.create(orm.em,next)
});
// antes de las rutas y middleware de negocio
app.use('/api/clients', clientRouter);
app.use('/api/client/classes', clientClassRouter);
app.use('/api/products', productRouter);
app.use('/api/product/brands', productBrandRouter);
app.use('/api/auth', authRoutes);
app.use('/api/product/classes', productClassRouter);
app.use('/api', mailRouter);
app.use('/api/orders', orderRouter)

app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' })
  })

//await syncSchema() //never in production. This is for development only

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

