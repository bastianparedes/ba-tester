# BA Tester

## Descripción
BATester es una plataforma que simplifica y automatiza el proceso de realizar pruebas A/B. Está diseñada para profesionales de marketing y analistas de datos que desean obtener información valiosa sobre qué variante produce los mejores resultados. Con BATester, puedes optimizar la experiencia del usuario y los objetivos de conversión al realizar pruebas A/B de manera eficiente.

## Instalación
Sigue estos pasos para instalar y configurar BATester en tu entorno local:

1. Instala [MySql](https://dev.mysql.com/downloads/mysql/) en tu sistema.
2. Crea un nuevo esquema en MySql para BATester.
3. Clona este repositorio en tu máquina local.
4. Crea un archivo llamado ".env" en la raíz del proyecto.
5. Dentro del archivo ".env", crea una variable llamada "DATABASE_URL" y asígnale el valor de la URI que apunta al schema en tu base de datos MySql.
6. Abre una terminal y navega hasta el directorio raíz del proyecto clonado.
7. Ejecuta los siguientes comandos para instalar las dependencias requeridas:
   - ```npm ci```

## Levantar el ambiente en local
Para levantar el ambiente en local basta con ejecutar ```npm run dev``` en la terminal.

## Variables de entorno
Variable | Optional
--- | ---
basePath | Yes
DATABASE_URL | No
DATABSE_TOKEN | No
DOMAIN | Yes

