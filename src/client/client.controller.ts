import { Request, Response, NextFunction } from 'express';
import { Client } from './client.entity.js';
import { orm } from '../shared/db/orm.js';
import { DI } from '../shared/db/orm.js';


const em = orm.em;

function sanitizeClientInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    postalCode: req.body.postalCode,
    dni: req.body.dni,
    clientClass: req.body.clientClass,
     password: req.body.password,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const clients = await em.find(
      Client,
      {},
      { populate: ['clientClass'] }
    )
    res.status(200).json({ message: 'found all clients', data: clients })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const client = await em.findOneOrFail(Client, { id }, { populate: ['clientClass'] });
    res.status(200).json({ message: 'found client', data: client });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const data = req.body.sanitizedInput || req.body;

    const client = new Client();
    client.name = data.name;
    client.lastname = data.lastname;
    client.birthdate = new Date(data.birthdate);
    client.email = data.email;
    client.phone = data.phone;
    client.address = data.address;
    client.city = data.city;
    client.country = data.country;
    client.postalCode = data.postalCode;
    client.dni = data.dni;
    client.password = data.password;

    // Asociar clientClass (por id)
    client.clientClass = await DI.em.findOneOrFail('ClientClass', data.clientClass);

    await DI.em.persistAndFlush(client);

    return res.status(201).json({
      message: 'Cliente creado correctamente',
      data: {
        id: client.id,
        email: client.email,
        name: client.name
      }
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    return res.status(500).json({ message: 'Error del servidor al crear cliente' });
  }
};

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const clientToUpdate = await em.findOneOrFail(Client, { id });
    em.assign(clientToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'client updated', data: clientToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const client = em.getReference(Client, id);
    await em.removeAndFlush(client);
    res.status(200).json({ message: 'client removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeClientInput, findAll, findOne, add, update, remove };
