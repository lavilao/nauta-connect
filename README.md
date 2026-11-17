# Extensión Nauta Connect ![Logo](./src/assets/vector/logo-min.svg "Nauta Connect")

### Ejemplo de la UI/UX final

![Logo](./images/ux.gif "User eXperience")

---

### Extensión para conectarse a la red Nauta de ETECSA de forma rápida, fácil y segura.

#### Toda colaboración al proyecto es bienvenida.

Extensión de código fuente abierto, publicado en Github en el enlace [mmaciass/nauta-connect](https://github.com/mmaciass/nauta-connect)

#### Ya puedes instalarlo en tu navegador.
- Para Google Chrome, desde el enlace de [Google/nauta-connect](https://chromewebstore.google.com/detail/nauta-connect/ppopcmgfgajciikdmipmmpffkpccinep).
- Para Mozilla Firefox, desde el enlace de [Firefox/nauta-connect](https://addons.mozilla.org/es/firefox/addon/nauta-connect/).

#### Tecnologías y herramientas utilizadas en el proceso de desarrollo:

- Manifest V3 (service worker, `chrome.alarms`, offscreen document)
- React 19
- Redux 5
- Material UI 7
- Formik 2 + Yup
- jose (validación de licencias con WebCrypto)
- dayjs
- Webpack 5
- Node ^v20.12.0
- Bun ^1.4.4
- Otras

#### Navegador en que se ha probado satisfactoriamente

- Google Chrome
- Mozilla Firefox
- Opera

#### Pasos para configurar el proyecto:

- Clonar el proyecto de Github.
- Abrir un terminal en la carpeta del proyecto y ejecutar el siguiente comando: `bun install` (o `npm install`).
- Esperar hasta que termine de instalarse las dependencias.
- Para comenzar el modo de desarrollo ejecutar el comando `bun run start` (o `npm run start`).
- Una vez terminado el transpilado, ya se puede instalar en el navegador la extensión en modo desarrollador.

Para compilar la extension en modo de producción debe ejecutar el comando `bun run build` (o `npm run build`), que deja el resultado en la carpeta `build`.

#### Configuración opcional

- `REACT_APP_KEY_PROTECT`: clave usada para cifrar las contraseñas guardadas en `chrome.storage.sync`. Si no se define, las cuentas guardadas no se pueden recuperar. Puede exportarse en el entorno antes de compilar:

```bash
REACT_APP_KEY_PROTECT="su-clave" bun run build
```

### Funciones que aún faltan por implementar:

- Por el momento se me acabaron las ideas... AHORA ES CUANDO CUALQUIER IDEA ES BIENVENIDA 🎉 📬
