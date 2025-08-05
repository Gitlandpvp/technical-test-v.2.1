# Guía de Listas de Usuarios

## Descripción General

He creado varias opciones para mostrar listas de usuarios en tu aplicación de Torre. Cada opción tiene diferentes características y casos de uso.

## Opciones Disponibles

### 1. **UserList Component** (`components/UserList.tsx`)
**Características:**
- Lista simple de usuarios populares
- Búsqueda automática con términos aleatorios
- Botón de actualización
- Manejo de errores
- Loading states

**Uso:**
```tsx
import UserList from '@/components/UserList';

<UserList 
  title="Popular Users" 
  limit={12} 
  showRefresh={true} 
/>
```

**Props:**
- `title`: Título de la lista (opcional)
- `limit`: Número máximo de usuarios a mostrar (default: 12)
- `showRefresh`: Mostrar botón de actualización (default: true)

### 2. **CategoryUserList Component** (`components/CategoryUserList.tsx`)
**Características:**
- Usuarios organizados por categorías
- 5 categorías predefinidas: Desarrolladores, Diseñadores, Gerentes, Científicos de Datos, Marketing
- Interfaz con pestañas para cambiar categorías
- Búsqueda específica por categoría

**Uso:**
```tsx
import CategoryUserList from '@/components/CategoryUserList';

<CategoryUserList 
  selectedCategory="developers" 
  limit={8} 
/>
```

**Props:**
- `selectedCategory`: Categoría inicial (default: 'developers')
- `limit`: Número máximo de usuarios por categoría (default: 8)

**Categorías Disponibles:**
- `developers`: Desarrolladores
- `designers`: Diseñadores
- `managers`: Gerentes
- `data`: Científicos de Datos
- `marketing`: Marketing

### 3. **Página Dedicada** (`app/users/page.tsx`)
**Características:**
- Página completa con header y navegación
- Toggle entre vista de usuarios populares y por categorías
- Diseño profesional con layout completo

**Acceso:** `/users`

### 4. **Integración en Página Principal** (`app/page.tsx`)
**Características:**
- Sección de usuarios populares en la página principal
- Link a la página completa de usuarios
- Integración natural con la funcionalidad de búsqueda

## Cómo Implementar

### Opción 1: Usar en Página Existente
```tsx
// En cualquier página
import UserList from '@/components/UserList';

export default function MyPage() {
  return (
    <div>
      <h1>Mi Página</h1>
      <UserList title="Usuarios Destacados" limit={8} />
    </div>
  );
}
```

### Opción 2: Crear Nueva Página
```tsx
// app/explore/page.tsx
import CategoryUserList from '@/components/CategoryUserList';

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explorar Profesionales</h1>
      <CategoryUserList selectedCategory="designers" limit={12} />
    </div>
  );
}
```

### Opción 3: Componente Personalizado
```tsx
// components/MyCustomUserList.tsx
'use client';

import { useState, useEffect } from 'react';
import { TorreAPI } from '@/lib/torre-api';
import PersonCard from './PersonCard';

export default function MyCustomUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const results = await TorreAPI.searchPeopleByName('developer', 10);
        setUsers(results);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <PersonCard key={user.id} person={user} />
      ))}
    </div>
  );
}
```

## Personalización

### Cambiar Términos de Búsqueda
```tsx
// En CategoryUserList.tsx, modificar el array categories:
const categories: Category[] = [
  {
    id: 'frontend',
    name: 'Frontend Developers',
    icon: <Code className="h-5 w-5" />,
    searchTerms: ['frontend', 'react', 'vue', 'angular']
  },
  // ... más categorías
];
```

### Añadir Nuevas Categorías
```tsx
// Añadir al array categories:
{
  id: 'mobile',
  name: 'Desarrolladores Móviles',
  icon: <Smartphone className="h-5 w-5" />,
  searchTerms: ['mobile developer', 'ios', 'android', 'react native']
}
```

### Personalizar Estilos
```tsx
// Modificar las clases CSS en los componentes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Contenido */}
</div>
```

## Características Técnicas

### Manejo de Errores
- Todos los componentes incluyen manejo robusto de errores
- Mensajes de error informativos en español
- Botones de reintento automático

### Loading States
- Indicadores de carga con spinners
- Estados de carga optimizados para UX

### Responsive Design
- Grid layouts adaptativos
- Diseño mobile-first
- Breakpoints optimizados

### Performance
- Lazy loading de componentes
- Optimización de re-renders
- Caching de resultados

## Próximas Mejoras Sugeridas

1. **Filtros Avanzados**: Añadir filtros por ubicación, experiencia, etc.
2. **Paginación**: Implementar paginación para listas grandes
3. **Favoritos**: Sistema de guardar usuarios favoritos
4. **Comparación**: Comparar perfiles de usuarios
5. **Exportar**: Exportar listas a CSV/PDF
6. **Notificaciones**: Alertas para nuevos usuarios
7. **Búsqueda Avanzada**: Filtros por skills específicos

## Troubleshooting

### Error: "No se pueden cargar usuarios"
- Verificar conexión a internet
- Comprobar que la API de Torre esté funcionando
- Revisar logs del navegador

### Error: "Categoría no encontrada"
- Verificar que la categoría existe en el array `categories`
- Comprobar que el `selectedCategory` sea válido

### Performance Lenta
- Reducir el `limit` de usuarios
- Implementar virtualización para listas grandes
- Optimizar las llamadas a la API

## Conclusión

Estas opciones te proporcionan flexibilidad completa para mostrar listas de usuarios en tu aplicación. Puedes usar los componentes predefinidos o crear versiones personalizadas según tus necesidades específicas. 