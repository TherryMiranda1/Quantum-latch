### **README.md**

# Quantum

Quantum es una aplicación moderna diseñada para integrarse con GitHub y proporcionar herramientas avanzadas para gestionar repositorios y automatizar flujos de trabajo. Con Quantum, los usuarios pueden listar, administrar y colaborar en repositorios con facilidad mientras aprovechan la potencia de las integraciones de GitHub Apps.

## **Características principales**

- **Autenticación segura con GitHub App**: Conéctate utilizando un token JWT firmado y accede a los repositorios en los que la app está instalada.
- **Gestión de instalaciones**: Lista todos los repositorios asociados con una instalación de la app.
- **Permisos granulares**: Utiliza configuraciones específicas para acceder solo a los datos que necesitas.
- **Soporte para repositorios privados y públicos**: Compatible con proyectos de cualquier tipo dentro de GitHub.

---

## **Requisitos previos**

Antes de usar Quantum, asegúrate de tener configurados los siguientes elementos:

1. **Node.js** (versión 16 o superior).
2. **GitHub App** registrada en tu cuenta de GitHub con:
   - Permisos de lectura/escritura sobre repositorios.
   - Una clave privada descargada en formato PEM.
   - App ID y Client ID configurados.
3. **Dependencias instaladas** mediante `pnpm install`.

---

## **Configuración inicial**

### 1. **Clonar el repositorio**

```bash
git clone https://github.com/TherryMiranda1/Quantum-latch.git
cd quantum
```

### 2. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes claves:

```env
GITHUB_APP_ID=<ID de tu GitHub App>
GITHUB_APP_SECRET_KEY=<Clave privada en formato PEM>
GITHUB_WEBHOOK_SECRET=<Clave secreta para los webhooks>
```

### 3. **Instalar dependencias**

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

---

## **Uso**

### **1. Generar un token de instalación**

Quantum puede generar automáticamente un token para autenticar solicitudes a la API de GitHub.

```typescript
const installationToken = await getInstallationToken(installationId);
```

### **2. Listar repositorios accesibles**

Después de autenticarte, puedes listar todos los repositorios asociados con la instalación:

```typescript
const repositories = await listInstallationRepositories(installationId);
```

---

## **Scripts disponibles**

### **`npm run dev`**

Inicia el servidor en modo de desarrollo.

```bash
npm run dev
```

### **`npm run build`**

Compila el proyecto para producción.

```bash
npm run build
```

### **`npm run start`**

Inicia el servidor en modo de producción.

```bash
npm run start
```

---

## **Estructura del proyecto**

```plaintext
quantum/
├── src/
│   ├── auth/          # Lógica de autenticación con GitHub
│   ├── api/           # Interacciones con la API de GitHub
│   ├── utils/         # Funciones de utilidad
│   ├── index.ts       # Punto de entrada principal
├── tests/             # Pruebas automatizadas
├── .env               # Variables de entorno
├── package.json       # Configuración del proyecto y dependencias
└── README.md          # Documentación del proyecto
```

---

## **Contribuciones**

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza tus cambios y escribe pruebas para ellos.
4. Envía un pull request explicando tus cambios.

---

## **Licencia**

Quantum está disponible bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.

---

¡Gracias por usar **Quantum**! 🚀
