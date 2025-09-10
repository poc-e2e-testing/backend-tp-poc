# Entorno de Pruebas - Backend E-Commerce Café Don Julio

## Descripción General

Este documento describe la configuración y uso del entorno de pruebas para el backend del e-commerce de café Don Julio. El sistema utiliza Node.js, TypeScript, MikroORM y MongoDB para proporcionar una API REST completa.

## Dataset de Pruebas

### Script de Seeding

El proyecto incluye un script de seeding ubicado en `src/shared/db/seeder.ts` que inicializa la base de datos con datos de prueba consistentes y realistas.

#### Datos Generados

El script crea automáticamente:

**ProductBrands (Marcas de Café):**

- **Don Julio Premium**: Café premium de origen único con notas frutales y cuerpo medio
- **Hacienda Del Valle**: Café orgánico cultivado en las montañas con sabor intenso y aromático

**ProductClasses (Categorías de Producto):**

- **Granos**: Café en grano entero para molienda fresca
- **Molido**: Café molido listo para preparar
- **Accesorios**: Accesorios y utensilios para la preparación de café

**ClientClasses (Tipos de Cliente):**

- **Administrador**: Para usuarios con permisos administrativos
- **Cliente Regular**: Para usuarios finales del sistema

**Clients (Usuarios del Sistema):**

- **Administrador**:

  - Email: `admin@donjulio.com`
  - Contraseña: `Admin1234!`
  - Rol: `admin`
  - Datos completos de perfil

- **Cliente de Prueba**:
  - Email: `cliente@donjulio.com`
  - Contraseña: `Cliente1234!`
  - Rol: `client`
  - Datos completos de perfil

**Products (Productos):**

- **Don Julio Premium Granos 500g**: Café premium en grano ($2500, stock: 50)
- **Hacienda Del Valle Molido 250g**: Café orgánico molido ($1800, stock: 75)

### Ejecución del Seeding

```bash
# Comando directo (recomendado)
pnpm run seed

# O manualmente:
pnpm run build && node dist/shared/db/seeder.js

# Verificar que los datos se crearon correctamente:
pnpm run build && node dist/shared/db/verify.js
```

### Características Técnicas

- **Limpieza automática**: El script limpia todas las colecciones antes de crear nuevos datos
- **Orden de limpieza**: Respeta las dependencias (OrderItem → Order → Product → Client → Category → ProductBrand → ProductClass → CategoryType → ClientClass)
- **Encriptación de contraseñas**: Utiliza el hook `@BeforeCreate` de la entidad Client para encriptar automáticamente las contraseñas
- **Relaciones consistentes**: Mantiene la integridad referencial entre todas las entidades
- **Datos realistas**: Los datos generados son representativos de un e-commerce real de café
- **Verificación incluida**: Script de verificación disponible para validar datos y relaciones

## Estructura del Proyecto

### Tecnologías Principales

- **Runtime**: Node.js
- **Lenguaje**: TypeScript
- **Base de Datos**: MongoDB
- **ORM**: MikroORM
- **Framework**: Express.js
- **Autenticación**: JWT + bcrypt

### Entidades Principales y Relaciones

```
├── Client (Clientes/Usuarios)
│   └── ManyToOne → ClientClass
├── ClientClass (Tipos de Cliente)
│   └── OneToMany → Client
├── Product (Productos)
│   ├── ManyToOne → ProductBrand
│   └── ManyToOne → ProductClass
├── ProductBrand (Marcas)
│   └── OneToMany → Product
├── ProductClass (Categorías de Producto)
│   └── OneToMany → Product
├── Order (Órdenes)
│   ├── ManyToOne → Client
│   └── OneToMany → OrderItem
├── OrderItem (Items de Orden)
│   └── ManyToOne → Order
├── Category (Categorías adicionales)
│   └── ManyToOne → CategoryType
└── CategoryType (Tipos de Categoría)
    └── OneToMany → Category
```

### Funcionalidades Implementadas

- ✅ Autenticación y autorización (JWT)
- ✅ Gestión de usuarios y roles
- ✅ CRUD completo de productos
- ✅ Sistema de marcas y categorías
- ✅ Gestión de órdenes de compra
- ✅ Upload de imágenes (Cloudinary)
- ✅ Envío de emails
- ✅ Middleware de seguridad

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno:

```env
# Base de datos
MONGO_URI=mongodb://localhost:27017/donjulio

# JWT
JWT_SECRET=tu_jwt_secret_key

# Cloudinary (para imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Email (opcional)
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password
```

## Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Modo desarrollo con auto-reload
pnpm run dev

# Compilar TypeScript
pnpm run build

# Ejecutar tests
pnpm test

# Inicializar datos de prueba
pnpm run seed
```

## Testing

### Tests Implementados

- Middleware de autenticación
- Validación de tokens JWT
- Pruebas de autorización

### Ejecutar Tests

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar tests específicos
pnpm test -- --grep "auth"
```

## Estados de la Base de Datos

### Estado Inicial (Post-Seeding)

- 2 marcas de café configuradas
- 3 categorías de producto definidas
- 2 usuarios de prueba (admin + cliente)
- 2 productos de ejemplo
- Base de datos lista para pruebas completas

### Reinicialización

El script de seeding puede ejecutarse múltiples veces de forma segura, ya que limpia automáticamente los datos existentes antes de crear nuevos registros.

---

## Próximas Implementaciones

### Sección de Rutas (Pendiente)

- Documentación completa de endpoints REST
- Ejemplos de requests/responses
- Códigos de estado HTTP
- Parámetros y validaciones

### CI/CD (Pendiente)

- Pipeline de integración continua
- Despliegue automatizado
- Tests automatizados en pipeline
- Configuración de entornos (dev/staging/prod)

---

_Documento actualizado: Septiembre 2025_
