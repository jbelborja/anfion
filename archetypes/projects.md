---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
description: "Breve descripción de la obra, tipología estructural y estrategia energética."
date: {{ .Date }}
featured_image: "/images/projects/ejemplo/featured.jpg"
location: "Madrid, España"
year: "{{ now.Year }}"
surface: 200
category: "Obra Nueva" # Opciones: "Obra Nueva", "Rehabilitación", "Reforma"
passivhaus_badge: "Passivhaus Classic" # Opciones: "Passivhaus Classic", "Passivhaus Plus", "EnerPHit Certificado"
filter_tag: "passivhaus" # Opciones para el filtro: "passivhaus", "rehabilitacion", "bioclimatica"

# Parámetros Técnicos
heating_demand: "≤ 15 kWh/m²a"
airtightness: "0.45 h⁻¹"
wall_u_value: "0.14 W/m²K"
windows_type: "Triple Vidrio Argón"
ventilation: "VMC con recuperación de calor"
energy_rating: "A (Casi Nulo)"

# Galería fotográfica interactiva
# Puedes añadir tantas fotos como desees, o dejarlo vacío si usas un Page Bundle con imágenes locales
gallery:
  - src: "/images/projects/ejemplo/foto-1.jpg"
    title: "Fachada Principal y Captación Solar"
    category: "Exterior"
    caption: "Descripción del detalle constructivo, orientación o materiales empleados."
  - src: "/images/projects/ejemplo/foto-2.jpg"
    title: "Espacio Interior y Confort Térmico"
    category: "Interior"
    caption: "Descripción de la distribución, luz natural o acabados saludables."
  - src: "/images/projects/ejemplo/foto-3.jpg"
    title: "Detalle de Hermeticidad o Aislamiento"
    category: "Detalle Técnico"
    caption: "Detalle del encuentro de envolvente o ensayo Blower Door."
---

### Memoria y Concepto Arquitectónico

Describe aquí el concepto de la vivienda o rehabilitación, la elección de materiales y las soluciones adoptadas para cumplir los estándares de eficiencia Passivhaus.
