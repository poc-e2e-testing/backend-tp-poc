import { MongoEntityManager } from '@mikro-orm/mongodb';
import { Client } from '../../client/client.entity.js';
import { ClientClass } from '../../client/clientClass.entity.js';
import { Product } from '../../product/product.entity.js';
import { ProductBrand } from '../../product/productBrand.entity.js';
import { ProductClass } from '../../product/productClass.entity.js';
import { Category } from '../../category/category.entity.js';
import { CategoryType } from '../../category/categoryType.entity.js';
import { Order } from '../../order/order.entity.js';
import { OrderItem } from '../../order/orderItem.entity.js';
import { orm } from './orm.js';

async function seed() {
  const em = orm.em.fork() as MongoEntityManager;

  try {
    await em.nativeDelete(OrderItem, {});
    await em.nativeDelete(Order, {});
    await em.nativeDelete(Product, {});
    await em.nativeDelete(Client, {});
    await em.nativeDelete(Category, {});
    await em.nativeDelete(ProductBrand, {});
    await em.nativeDelete(ProductClass, {});
    await em.nativeDelete(CategoryType, {});
    await em.nativeDelete(ClientClass, {});

    // ClientClass
    const adminClass = new ClientClass();
    adminClass.name = 'Administrador';

    const clientClass = new ClientClass();
    clientClass.name = 'Cliente Regular';

    em.persist([adminClass, clientClass]);
    await em.flush();

    // ProductBrands
    const brand1 = new ProductBrand();
    brand1.nombre = 'Don Julio Premium';
    brand1.descripcion =
      'Café premium de origen único con notas frutales y cuerpo medio';

    const brand2 = new ProductBrand();
    brand2.nombre = 'Hacienda Del Valle';
    brand2.descripcion =
      'Café orgánico cultivado en las montañas con sabor intenso y aromático';

    em.persist([brand1, brand2]);
    await em.flush();

    // ProductClasses
    const class1 = new ProductClass();
    class1.name = 'Granos';
    class1.description = 'Café en grano entero para molienda fresca';

    const class2 = new ProductClass();
    class2.name = 'Molido';
    class2.description = 'Café molido listo para preparar';

    const class3 = new ProductClass();
    class3.name = 'Accesorios';
    class3.description = 'Accesorios y utensilios para la preparación de café';

    em.persist([class1, class2, class3]);
    await em.flush();

    // Clients
    const admin = new Client();
    admin.name = 'Administrator';
    admin.lastname = 'Don Julio';
    admin.birthdate = new Date('1980-01-01');
    admin.email = 'admin@donjulio.com';
    admin.phone = '+54 11 1234-5678';
    admin.address = 'Av. Corrientes 1234';
    admin.city = 'Buenos Aires';
    admin.country = 'Argentina';
    admin.postalCode = '1043';
    admin.dni = '12345678';
    admin.role = 'admin';
    admin.password = 'Admin1234!';
    admin.clientClass = adminClass;

    const client = new Client();
    client.name = 'Juan';
    client.lastname = 'Pérez';
    client.birthdate = new Date('1990-05-15');
    client.email = 'cliente@donjulio.com';
    client.phone = '+54 11 8765-4321';
    client.address = 'Calle Falsa 123';
    client.city = 'Buenos Aires';
    client.country = 'Argentina';
    client.postalCode = '1425';
    client.dni = '87654321';
    client.role = 'client';
    client.password = 'Cliente1234!';
    client.clientClass = clientClass;

    em.persist([admin, client]);
    await em.flush();

    // Products
    const product1 = new Product();
    product1.nombre = 'Don Julio Premium Granos 500g';
    product1.descripcion =
      'Café premium en grano entero, tostado medio, ideal para espresso y métodos de filtrado';
    product1.precio = '2500';
    product1.stock = 50;
    product1.productBrand = brand1;
    product1.productClass = class1;
    product1.imgUrl = 'https://example.com/don-julio-granos.jpg';

    const product2 = new Product();
    product2.nombre = 'Hacienda Del Valle Molido 250g';
    product2.descripcion =
      'Café orgánico molido fino, perfecto para cafetera italiana y francesa';
    product2.precio = '1800';
    product2.stock = 75;
    product2.productBrand = brand2;
    product2.productClass = class2;
    product2.imgUrl = 'https://example.com/hacienda-molido.jpg';

    em.persist([product1, product2]);
    await em.flush();

    console.log('✅ Seeding completado exitosamente');
    console.log(
      '🧹 Colecciones limpiadas: OrderItem, Order, Product, Client, Category, ProductBrand, ProductClass, CategoryType, ClientClass'
    );
    console.log('📊 Datos creados:');
    console.log('   - 2 ProductBrands');
    console.log('   - 3 ProductClasses');
    console.log('   - 2 ClientClasses');
    console.log('   - 2 Clients (1 admin, 1 cliente)');
    console.log('   - 2 Products');
  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
    throw error;
  } finally {
    await orm.close();
  }
}

seed().catch((error) => {
  console.error('💥 Error fatal en el seeder:', error);
  process.exit(1);
});
