# PIS-Frontend

Este es el repositorio del frontend del proyecto PIS (Project Information System). Es una aplicación web desarrollada con React, utilizando Vite como build tool y Yarn para la gestión de paquetes.

## Pre-requisitos

Este proyecto requiere Node.js y Yarn. Asegúrate de tenerlos instalados antes de proceder:

- Node.js: [Descargar Node.js](https://nodejs.org/)

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:

```bash
yarn install
```
Configuración Local
Necesitarás configurar las variables de entorno locales antes de iniciar la aplicación. Crea un archivo .env.local en la raíz del proyecto y configúralo siguiendo el ejemplo proporcionado en .env.example.

Desarrollo
Para iniciar el servidor de desarrollo, ejecuta:
```bash
yarn dev
```
El servidor de desarrollo se iniciará y podrás acceder a la aplicación en http://localhost:3000.

Construcción para Producción
Para construir el proyecto para el entorno de producción, ejecuta:

```bash
yarn build
```
Este comando generará el directorio dist con los archivos optimizados para producción.