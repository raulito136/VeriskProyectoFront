### 🛠️ 1. Elementos Base (Core)

- **Botón (`ui-button`)**
  - _Variantes necesarias:_ `primary` (acciones principales), `secondary` (cancelar/volver) y `danger` (para el borrado lógico/soft-delete en Reference Data).
- **Pestañas (`ui-tabs` o `ui-accordion`)**
  - _Uso:_ Indispensable para la vista de detalle en `mfe-claims` (para alternar entre la información del reclamo, los comentarios y el historial de auditoría).

### 📝 2. Controles de Formulario (Form Inputs)

- **Campo de Texto (`ui-input`)**
  - _Uso:_ Para entradas de texto libre (nombres, descripciones) y números (montos asegurados).
- **Menú Desplegable (`ui-select`)**
  - _Uso:_ Para seleccionar el titular de la póliza y los estados fijos (_Status_).
- **Selector de Fecha (`ui-datepicker`)**
  - _Uso:_ Crítico para las historias de usuario que exigen ingresar _"claim date"_ y fechas de cobertura.
- **Interruptor (`ui-toggle` o `ui-switch`)**
  - _Uso:_ Específico para el filtro de activo/inactivo (_"toggle active/inactive filter"_) en Reference Data.
- **Cascarón de Formulario (`ui-form`)**
  - _Uso:_ Contenedor visual básico con `<ng-content>` para estructurar los campos y los botones de acción (Guardar/Cancelar) de manera uniforme en todos los MFEs.

### 📊 3. Visualización de Datos (Data Display)

- **Tabla de Datos (`ui-table`)**
  - _Uso:_ Componente base para mostrar las listas de datos (Reference Data, Policies, Claims).
- **Paginador (`ui-pagination`)**
  - _Uso:_ Controles de "Anterior", "Siguiente" y números de página, requerido explícitamente para las tablas de `mfe-policies` y `mfe-claims`.
- **Tarjeta Configurables (`ui-card`)**
  - _Uso:_ Contenedor con sombra y bordes para agrupar visualmente la información en las vistas de detalle (`/:id`).
- **Línea de Tiempo (`ui-timeline`)**
  - _Uso:_ Componente visual cronológico requerido exclusivamente para renderizar el _"audit trail"_ en los reclamos.

### ⚠️ 4. Feedback y Estados (Feedback & States)

- **Mensaje de Error en línea (`ui-inline-error`)**
  - _Uso:_ Texto rojo o pequeña caja de alerta que aparece debajo/junto a los campos de formulario, cumpliendo la regla estricta de _"The component renders errors inline"_.
- **Indicador de Carga (`ui-spinner` o `ui-loader`)**
  - _Uso:_ Círculo de carga o barra de progreso para mostrar mientras los servicios Angular hacen las peticiones HTTP (`GET`/`POST`) y para el indicador global del Shell.
