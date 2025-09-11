# Configuración del Servidor

## Instalación

```bash
pnpm install
```

## Variables de Entorno

Copiar `.env.example` a `.env` y configurar las variables:

```bash
cp .env.example .env
```

Variables requeridas:

- `MONGO_URI_DEV`: URI de MongoDB para desarrollo
- `MONGO_URI_TEST`: URI de MongoDB para pruebas
- `CLOUDINARY_CLOUD_NAME`: Nombre del cloud de Cloudinary
- `CLOUDINARY_API_KEY`: API Key de Cloudinary
- `CLOUDINARY_API_SECRET`: API Secret de Cloudinary

## Comandos Disponibles

### Desarrollo

```bash
pnpm start:dev
```

Inicia el servidor en modo desarrollo con NODE_ENV=development

### Pruebas E2E

```bash
pnpm start:test
```

Inicia el servidor en modo test con NODE_ENV=test. Ejecuta una sola compilación, ejecuta el seeder para limpiar y cargar datos de prueba, luego inicia el servidor en watch mode.

### Producción

```bash
pnpm start
```

Inicia el servidor en modo por defecto

### Seeder

```bash
pnpm seed
```

Ejecuta el seeder para limpiar y cargar datos en la base de datos (modo desarrollo)

```bash
pnpm seed:test
```

Ejecuta el seeder para limpiar y cargar datos en la base de datos (modo test)

### Build

```bash
pnpm build
```

Compila el proyecto TypeScript a JavaScript

## Optimizaciones

- start:dev: Una sola compilación, watch mode para desarrollo
- start:test: Una sola compilación + seeder + watch mode. No hay doble compilación
- seed:test: Compilación optimizada solo para seeding en modo test
- Cada cambio en start:test ejecuta seeder + reinicia servidor para datos frescos
