# Meta Pixel Implementation - Poder Legal

## ✅ Implementación Completada

Se ha implementado un sistema completo de tracking de Meta Pixel para medir conversiones en la aplicación Poder Legal.

## 📊 Eventos Implementados

### 1. **PageView** (Ya existía)
- **Ubicación**: `index.html`
- **Descripción**: Rastrea todas las vistas de página
- **ID del Pixel**: `784703333926837`

### 2. **Purchase** (Nuevo)
- **Ubicación**: `src/pages/Success.tsx`
- **Cuándo se dispara**: Cuando el usuario llega a la página de éxito después de una compra
- **Datos enviados**:
  - `value`: Valor total de la compra
  - `currency`: USD
  - `content_ids`: IDs de los productos comprados
  - `content_type`: "product"
  - `content_name`: Nombres de los productos
  - `content_category`: "legal_documents"
  - `num_items`: Cantidad de productos

### 3. **AddToCart** (Nuevo)
- **Ubicación**: `src/context/CartContext.tsx`
- **Cuándo se dispara**: Cada vez que se agrega un producto al carrito
- **Datos enviados**:
  - `value`: Precio del producto
  - `currency`: USD
  - `content_ids`: ID del producto
  - `content_type`: "product"
  - `content_name`: Nombre del producto
  - `content_category`: "legal_documents"

### 4. **InitiateCheckout** (Nuevo)
- **Ubicaciones**: 
  - `src/components/cart/CartSummary.tsx`
  - `src/components/quiz2025/CheckoutStep.tsx`
- **Cuándo se dispara**: Cuando el usuario inicia el proceso de checkout
- **Datos enviados**:
  - `value`: Valor total del carrito
  - `currency`: USD
  - `content_ids`: IDs de todos los productos
  - `content_type`: "product"
  - `content_name`: Nombres de los productos
  - `content_category`: "legal_documents"
  - `num_items`: Cantidad total de items

### 5. **Lead** (Nuevo)
- **Ubicaciones**:
  - `src/components/quiz/ContactDataScreen.tsx`
  - `src/pages/Checkout.tsx`
- **Cuándo se dispara**: Cuando el usuario completa un formulario de contacto
- **Datos enviados**:
  - `content_name`: "Quiz Lead" o "Checkout Lead"
  - `content_category`: "legal_documents"
  - `status`: "qualified"

## 🔧 Archivos Modificados

1. **`src/lib/metaPixel.ts`** (Nuevo) - Utilidad para manejar Meta Pixel
2. **`src/pages/Success.tsx`** - Evento Purchase
3. **`src/context/CartContext.tsx`** - Evento AddToCart
4. **`src/components/cart/CartSummary.tsx`** - Evento InitiateCheckout
5. **`src/components/quiz2025/CheckoutStep.tsx`** - Evento InitiateCheckout
6. **`src/components/quiz/ContactDataScreen.tsx`** - Evento Lead
7. **`src/pages/Checkout.tsx`** - Evento Lead
8. **`src/vite-env.d.ts`** - Declaraciones de tipos TypeScript

## 🧪 Cómo Verificar que Funciona

### 1. **Usando Facebook Pixel Helper (Recomendado)**
1. Instala la extensión "Facebook Pixel Helper" en Chrome
2. Visita tu sitio web
3. Navega por el flujo de compra
4. La extensión mostrará todos los eventos que se disparan

### 2. **Usando las Herramientas de Desarrollador**
1. Abre las DevTools (F12)
2. Ve a la pestaña "Console"
3. En modo desarrollo, verás logs como:
   ```
   [Meta Pixel] Purchase: {value: 29.99, currency: "USD", ...}
   [Meta Pixel] AddToCart: {value: 29.99, currency: "USD", ...}
   ```

### 3. **Usando Facebook Events Manager**
1. Ve a [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Selecciona tu pixel (`784703333926837`)
3. Ve a "Eventos" para ver los eventos en tiempo real
4. Usa "Pruebas" para verificar eventos específicos

## 🎯 Flujo de Conversión Completo

1. **Usuario visita el sitio** → `PageView`
2. **Usuario agrega producto al carrito** → `AddToCart`
3. **Usuario inicia checkout** → `InitiateCheckout`
4. **Usuario completa formulario** → `Lead`
5. **Usuario completa compra** → `Purchase`

## 🚀 Beneficios de esta Implementación

- **Medición precisa de conversiones**: Cada paso del funnel está trackeado
- **Optimización de campañas**: Facebook puede optimizar para conversiones reales
- **Retargeting efectivo**: Puedes crear audiencias basadas en comportamiento
- **Análisis detallado**: Datos completos sobre el customer journey
- **Código mantenible**: Utilidad centralizada y tipada con TypeScript

## ⚠️ Consideraciones Importantes

1. **Privacidad**: Los eventos respetan las preferencias de privacidad del usuario
2. **GDPR**: Asegúrate de tener consentimiento para tracking
3. **Testing**: Siempre prueba en un entorno de desarrollo primero
4. **Monitoreo**: Revisa regularmente los eventos en Facebook Events Manager

## 🔍 Troubleshooting

Si no ves eventos:
1. Verifica que el pixel esté cargado correctamente
2. Revisa la consola del navegador por errores
3. Asegúrate de que estés en el flujo correcto de la aplicación
4. Verifica que los datos del evento sean válidos

## 📈 Próximos Pasos

1. **Configurar conversiones en Facebook Ads Manager**
2. **Crear audiencias personalizadas basadas en eventos**
3. **Configurar reglas de optimización automática**
4. **Monitorear el rendimiento de los eventos**
