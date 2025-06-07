# 🩺 Glucose Monitor App

> **Aplicación móvil para monitoreo de glucosa en tiempo real**  
> Prueba técnica desarrollada por **Daniel Ramírez** - *Fullstack Developer*

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

</div>

## 📱 Acerca del Proyecto

Esta aplicación móvil permite a los usuarios **monitorear sus niveles de glucosa** de manera intuitiva y visual. Desarrollada como una prueba técnica que demuestra la implementación de arquitecturas modernas y mejores prácticas en React Native.

### ✨ Características Principais
- 📊 **Visualización de datos** con gráficos interactivos SVG
- ⏰ **Filtros temporales** (6h, 12h, 24h)
- 🔐 **Autenticación segura** con persistencia de datos
- 🎨 **Interfaz moderna** siguiendo principios de Atomic Design
- 🚀 **Performance optimizada** con memoización y callbacks

## 🛠️ Tecnologías y Dependencias

### Core Framework
```json
{
  "react": "19.0.0",
  "react-native": "0.79.3",
  "typescript": "5.0.4"
}
```

### Gestión de Estado
```json
{
  "@reduxjs/toolkit": "^2.8.2",
  "react-redux": "^9.2.0",
  "redux-persist": "^6.0.0"
}
```

### Formularios y Validación
```json
{
  "react-hook-form": "^7.57.0",
  "@hookform/resolvers": "^5.0.1",
  "yup": "^1.6.1"
}
```

### UI y Gráficos
```json
{
  "react-native-svg": "^15.12.0",
  "react-native-vector-icons": "^10.2.0",
  "dayjs": "^1.11.13"
}
```

### Almacenamiento
```json
{
  "@react-native-async-storage/async-storage": "^2.2.0"
}
```

## 🏗️ Arquitectura del Proyecto

### 🎯 Atomic Design
La aplicación implementa **Atomic Design** para una organización clara y escalable: componentes separados en las carpetas de Atoms, molecules, organisms y templates.

### 🔄 Arquitectura Flux con Redux Toolkit
Elegí **Redux Toolkit** por las siguientes razones:

- **Predictabilidad**: Estado centralizado y flujo unidireccional
- **DevTools**: Excelente experiencia de debugging
- **Persistence**: Mantiene la sesión del usuario automáticamente
- **Tipado**: Integración perfecta con TypeScript

### 📝 TypeScript en Todo el Proyecto
La implementación completa de **TypeScript** proporciona:

- **Seguridad de tipos**: Prevención de errores en tiempo de compilación
- **Mejor DX**: Autocompletado inteligente y refactoring seguro
- **Escalabilidad**: Código más mantenible y documentado
- **Integración**: Tipado fuerte en Redux, API calls y componentes

### ⚡ Optimización de Performance

#### useMemo y useCallback
Implementé estas optimizaciones para **evitar re-renders innecesarios**:
#### React.memo
Todos los componentes están envueltos en `memo()` para optimizar renderizado.


## 🚀 Instalación y Ejecución

### Prerequisitos
```bash
node >= 18.0.0
npm >= 8.0.0
```

### 📦 Instalación de Dependencias
```bash
# Instalar dependencias de Node
npm install

# Para iOS (solo en macOS)
cd ios && pod install && cd ..
```

### 🖥️ Ejecución en Windows

```bash
# Iniciar Metro Bundler
npm start

# En otra terminal - Android
npm run android

# Para limpiar cache si hay problemas
npx react-native start --reset-cache
```

### 🍎 Ejecución en macOS

```bash
# Iniciar Metro Bundler
npm start

# En otra terminal - iOS
npm run ios

# En otra terminal - Android
npm run android

# Para limpiar cache
npx react-native start --reset-cache
```

### 🔧 Comandos Útiles

```bash
# Linting
npm run lint

# Testing
npm run test

# Limpiar proyecto
npx react-native clean
```

## 📊 Funcionalidades Principales

- **🔐 Autenticación**: Login seguro con validación de formularios
- **📈 Gráficos**: Visualización interactiva de datos de glucosa
- **⏰ Filtros**: Rangos temporales de 6h, 12h y 24h
- **🔄 Actualización**: Pull-to-refresh para datos en tiempo real
- **💾 Persistencia**: Sesión mantenida automáticamente

## 🎨 Credenciales de Prueba
  Email: postulante@prueba.com
  Contraseña: Aa123456.

  <div align="center">
  <p>Desarrollado con ❤️ por <strong>Daniel Ramírez</strong></p>
  <p><em>Fullstack Developer</em></p>
</div>