# Nueva Paleta de Colores

## Colores Implementados

### Colores Principales
- **Fondo Principal**: `#27292d` (gris oscuro)
- **Texto Principal**: `#cddc39` (verde lima)

### Paleta Completa

#### Fondos
- `background`: `#27292d` (fondo principal)
- `background-light`: `#2f3135` (fondo secundario)
- `background-dark`: `#1f2125` (fondo oscuro)

#### Texto
- `text`: `#cddc39` (texto principal)
- `text-light`: `#d4e34a` (texto claro)
- `text-dark`: `#b8c72a` (texto oscuro)
- `text-muted`: `#a0ae20` (texto atenuado)

#### Acentos
- `accent`: `#cddc39` (acento principal)
- `accent-light`: `#d4e34a` (acento claro)
- `accent-dark`: `#b8c72a` (acento oscuro)

#### Primarios (variaciones del verde)
- `primary-50`: `#f7f8e0`
- `primary-100`: `#eef1c7`
- `primary-200`: `#dde3a0`
- `primary-300`: `#c8d175`
- `primary-400`: `#b3bf4a`
- `primary-500`: `#9eac2f`
- `primary-600`: `#8a9924`
- `primary-700`: `#76861a`
- `primary-800`: `#627310`
- `primary-900`: `#4e6006`

## Componentes Actualizados

### 1. **Configuración de Tailwind** (`tailwind.config.js`)
- Añadidas nuevas variables de color
- Configurada paleta personalizada

### 2. **Estilos Globales** (`app/globals.css`)
- Fondo y texto base actualizados
- Componentes CSS actualizados con nuevos colores
- Clases utilitarias añadidas

### 3. **Layout Principal** (`app/layout.tsx`)
- Fondo y texto base configurados
- Clases de color aplicadas al body

### 4. **Página Principal** (`app/page.tsx`)
- Todos los textos actualizados a `text-text`
- Textos secundarios a `text-text-muted`
- Fondos de tarjetas a `bg-background-light`
- Bordes con `border-text/10`

### 5. **Componentes**
- **PersonCard**: Actualizado con nuevos colores
- **SearchBar**: Iconos y campos actualizados
- **UserList**: Estados de carga y error actualizados
- **CategoryUserList**: Botones y categorías actualizados
- **AnalyticsChart**: Gráficos con nueva paleta de colores

## Características del Diseño

### Contraste y Legibilidad
- Alto contraste entre fondo oscuro y texto verde lima
- Textos secundarios con opacidad para jerarquía visual
- Bordes sutiles para separación de elementos

### Estados Interactivos
- **Hover**: Transiciones suaves entre colores
- **Focus**: Anillos de enfoque en color verde lima
- **Active**: Estados activos con color de acento

### Estados de Error
- Fondos rojos oscuros con transparencia
- Textos en tonos rojos claros
- Bordes rojos sutiles

### Loading States
- Spinners en color de acento
- Textos de carga en color muted

## Uso de las Clases

### Texto
```tsx
<h1 className="text-text">Título Principal</h1>
<p className="text-text-muted">Texto secundario</p>
```

### Fondos
```tsx
<div className="bg-background">Fondo principal</div>
<div className="bg-background-light">Fondo secundario</div>
```

### Botones
```tsx
<button className="btn-primary">Botón principal</button>
<button className="btn-secondary">Botón secundario</button>
```

### Tarjetas
```tsx
<div className="card">Contenido de tarjeta</div>
```

### Inputs
```tsx
<input className="input-field" placeholder="Buscar..." />
```

## Beneficios del Nuevo Diseño

1. **Tema Oscuro**: Reduce la fatiga visual
2. **Alto Contraste**: Mejora la legibilidad
3. **Consistencia**: Paleta unificada en toda la aplicación
4. **Accesibilidad**: Cumple estándares de contraste
5. **Modernidad**: Diseño contemporáneo y profesional

## Compatibilidad

- ✅ **Next.js 14**: Totalmente compatible
- ✅ **Tailwind CSS**: Configuración optimizada
- ✅ **TypeScript**: Tipos mantenidos
- ✅ **Responsive**: Diseño adaptativo preservado
- ✅ **Accesibilidad**: Estándares WCAG cumplidos

## Próximas Mejoras

1. **Modo Claro**: Opción para alternar entre temas
2. **Personalización**: Permitir al usuario cambiar colores
3. **Animaciones**: Transiciones más elaboradas
4. **Iconografía**: Iconos adaptados al tema
5. **Micro-interacciones**: Feedback visual mejorado 