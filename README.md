# BackEnd - E-commerce "Don Julio Café"

## 1. Descripción del Proyecto

Este repositorio contiene el backend de la aplicación de e-commerce "Don Julio Café". Desarrollado con **Node.js**, **Express** y **TypeScript**, proporciona una API RESTful para gestionar todas las operaciones de la tienda, incluyendo productos, clientes, marcas, órdenes y autenticación.

La base de datos utilizada es **MongoDB**, y la interacción con ella se gestiona a través del ORM **MikroORM**, lo que permite un manejo de datos eficiente y escalable.

## 2. Tecnologías Principales

- **Entorno de ejecución:** Node.js
- **Framework:** Express.js
- **Lenguaje:** TypeScript
- **Base de Datos:** MongoDB
- **ORM:** MikroORM
- **Autenticación:** JWT (JSON Web Tokens) y bcryptjs para el hasheo de contraseñas.
- **Gestión de Imágenes:** Cloudinary para el almacenamiento de imágenes de productos.

## 3. Preparación del Entorno para Testing E2E

Este backend fue modificado y preparado específicamente para servir como un entorno estable y predecible para la ejecución de pruebas End-to-End (E2E). Las siguientes características fueron clave para lograrlo:

### 3.1. Base de Datos de Pruebas Aislada

Para garantizar que las pruebas automatizadas no interfieran con los datos de desarrollo (y viceversa), el proyecto está configurado para utilizar una **base de datos completamente separada** cuando se ejecuta en modo de prueba.

- Esto se gestiona a través de la variable de entorno `MONGO_URI_TEST` en el archivo `.env`.
- El script de inicio `pnpm start:test` establece automáticamente la variable `NODE_ENV=test`, asegurando que la aplicación se conecte a la base de datos de pruebas.

### 3.2. Seeder para un Estado Consistente (Seeding)

Para asegurar que cada ejecución de pruebas comience desde un estado conocido y limpio, se implementó un script de _seeding_ (`src/shared/db/seeder.ts`). Este script limpia las colecciones y crea datos de prueba predefinidos (usuarios, productos, etc.), haciendo los tests 100% repetibles.

### 3.3. Scripts Dedicados para Testing

Se crearon scripts específicos en `package.json` (`start:test`, `seed:test`) para automatizar el ciclo de preparación y ejecución del servidor en un entorno de pruebas.

## 4. Instalación y Configuración

Para levantar el proyecto en tu entorno local, ya sea para desarrollo o para ejecutar las pruebas E2E, sigue las instrucciones detalladas en nuestra guía de configuración. Allí encontrarás los comandos necesarios para instalar dependencias, configurar las variables de entorno y correr los diferentes scripts.

➡️ **[Ver Guía de Instalación y Comandos (SETUP.md)](./SETUP.md)**

## 5. Autores Originales (Agradecimientos)

Agradecemos enormemente al equipo original que desarrolló este backend, proporcionando una base de código robusta y bien estructurada que fue ideal para nuestra Prueba de Concepto de testing.

<table>
  <thead>
    <tr>
      <th align="center">Avatar</th>
      <th>Nombre Completo</th>
      <th align="center">Perfil de GitHub</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <img src="https://github.com/MaNNu017.png" alt="Avatar de Manuel Coccoz" width="80">
      </td>
      <td valign="middle">Manuel Coccoz</td>
      <td align="center" valign="middle">
        <a href="https://github.com/MaNNu017">
          <img src="https://img.shields.io/badge/GitHub-Profile-blue?style=for-the-badge&logo=github" alt="Perfil de GitHub">
        </a>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle">
        <img src="https://github.com/guidoRodriguez13.png" alt="Avatar de Guido Rodriguez" width="80">
      </td>
      <td valign="middle">Guido Rodriguez</td>
      <td align="center" valign="middle">
        <a href="https://github.com/guidoRodriguez13">
          <img src="https://img.shields.io/badge/GitHub-Profile-blue?style=for-the-badge&logo=github" alt="Perfil de GitHub">
        </a>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle">
        <img src="https://github.com/JuanBona.png" alt="Avatar de Juan Cruz Bonanno" width="80">
      </td>
      <td valign="middle">Juan Cruz Bonanno</td>
      <td align="center" valign="middle">
        <a href="https://github.com/JuanBona">
          <img src="https://img.shields.io/badge/GitHub-Profile-blue?style=for-the-badge&logo=github" alt="Perfil de GitHub">
        </a>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle">
        <img src="https://github.com/felifernandez07.png" alt="Avatar de Felipe Fernandez" width="80">
      </td>
      <td valign="middle">Felipe Fernandez</td>
      <td align="center" valign="middle">
        <a href="https://github.com/felifernandez07">
          <img src="https://img.shields.io/badge/GitHub-Profile-blue?style=for-the-badge&logo=github" alt="Perfil de GitHub">
        </a>
      </td>
    </tr>
  </tbody>
</table>

## 6. Documentación Completa de la PoC

Este backend fue utilizado como parte de una Prueba de Concepto (PoC) más amplia para comparar Cypress y Playwright. El análisis exhaustivo, las métricas y las conclusiones se encuentran en nuestro informe técnico.

➡️ **[Accede a toda la documentación y el informe final en Google Drive](https://drive.google.com/drive/u/0/folders/1U2MHWTdCO-14WlQMnh8lOvM7UlSrWKXD)**
