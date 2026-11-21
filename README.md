# Ánfion · Arquitectura, Casas Pasivas y Rehabilitación

Sitio web oficial y tema moderno basado en **Hugo** y **Tailwind CSS** para **Ánfion**, estudio de arquitectura especializado en estándar Passivhaus, diseño bioclimático y rehabilitación energética integral (EnerPHit).

- **Sitio en vivo**: [https://jbelborja.github.io/anfion/](https://jbelborja.github.io/anfion/)
- **Repositorio**: [https://github.com/jbelborja/anfion](https://github.com/jbelborja/anfion)

---

## 🚀 Creación de Nuevos Proyectos con Galería

El repositorio cuenta con un arquetipo preconfigurado para generar obras y proyectos con sus parámetros Passivhaus y plantilla de galería fotográfica interactiva.

Para crear un nuevo proyecto, ejecuta:

```bash
hugo new content projects/nuevo-proyecto.md
```

### Configuración de la Galería Fotográfica (Frontmatter)

En el archivo generado (`content/projects/nuevo-proyecto.md`), puedes configurar cada imagen de la galería con su título, categoría y pie de foto técnico descriptivo para el visor lightbox:

```yaml
---
title: "Casa Pasiva Roble"
description: "Vivienda unifamiliar Passivhaus Classic en madera CLT."
date: 2024-05-15
featured_image: "images/projects/casa-roble/featured.svg"
location: "Sierra de Guadarrama, Madrid"
year: "2024"
surface: 245
category: "Obra Nueva"
passivhaus_badge: "Passivhaus Classic"
filter_tag: "passivhaus bioclimatica"

# Parámetros Técnicos
heating_demand: "11.2 kWh/m²a"
airtightness: "0.38 h⁻¹"
wall_u_value: "0.12 W/m²K"
windows_type: "Triple Vidrio Argón Ug 0.5"
ventilation: "VMC Zehnder Q350 (94%)"
energy_rating: "A+ Casi Nulo"

# Galería fotográfica con pies de foto y visor Lightbox
gallery:
  - src: "images/projects/casa-roble/exterior-1.svg"
    title: "Fachada Sur y Control Solar"
    category: "Exterior"
    caption: "Lamas móviles de alerce para garantizar captación en invierno y protección solar en verano."

  - src: "images/projects/casa-roble/interior-clt.svg"
    title: "Salón Principal con Madera CLT Vista"
    category: "Interior"
    caption: "Espacio a doble altura con paneles de madera contralaminada y solera de inercia térmica."

  - src: "images/projects/casa-roble/blower-door.svg"
    title: "Ensayo de Hermeticidad Blower Door"
    category: "Instalaciones"
    caption: "Resultado final n50 = 0.38 h⁻¹, superando ampliamente el estándar oficial."
---
```

---

## 👥 Creación de Nuevos Miembros del Equipo

Los miembros del equipo son páginas de contenido completas con su propia URL (`/members/nombre-del-miembro/`), biografía, acreditaciones y especialidades. Para añadir un nuevo miembro:

```bash
hugo new content members/nombre-del-miembro.md
```

El archivo generado en `content/members/nombre-del-miembro.md` incluirá la plantilla con cargo, rol, credenciales, cita y especialidades.

---

## 🛠️ Comandos de Desarrollo Local

### 1. Iniciar el servidor local de desarrollo
```bash
hugo server --buildDrafts
```
Abre [http://localhost:1313/](http://localhost:1313/) en tu navegador.

### 2. Modificar y compilar estilos Tailwind CSS
```bash
# Compilar CSS minificado para producción
npm run build:css

# Observar cambios en tiempo real durante desarrollo
npm run watch:css

# Compilación completa (CSS + sitio Hugo)
npm run build
```

---

## 📦 Estructura del Proyecto

```
anfion/
├── .github/workflows/deploy.yml   # Despliegue automático a GitHub Pages
├── archetypes/
│   └── projects.md                # Plantilla para nuevos proyectos con galería
├── content/
│   ├── _index.md                  # Portada
│   ├── projects/                  # Obras y proyectos Passivhaus con galerías
│   ├── members/                   # Miembros del equipo técnico (3)
│   └── contact/                   # Contacto, formulario y FAQ
├── static/
│   └── images/                    # Imágenes estáticas y galerías
├── themes/anfion/                 # Tema personalizado Tailwind para arquitectura
│   ├── assets/css/input.css       # Entrada de Tailwind CSS
│   ├── static/js/main.js          # Visor Lightbox, filtros y menú móvil
│   └── layouts/                   # Plantillas HTML
└── hugo.toml                      # Configuración general del sitio
```

---

## 🌐 Despliegue Continuo (CI/CD)

Cada `push` a la rama `main` activa automáticamente el flujo de trabajo de GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)), que compila Tailwind CSS, genera el sitio con Hugo y lo publica en **GitHub Pages**.
