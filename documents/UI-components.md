# UI Components Library Documentation

This document outlines the shared UI components available in the `libs/ui` library. These components ensure a consistent design and functionality across all microfrontends (`mfe-reference-data`, `mfe-policies`, `mfe-claims`).

## Implemented Components Usage

### 1. Button (`<lib-button>`)
A reusable button component with various pre-defined styles.

**Attributes (Inputs):**
- `type` (`'default' | 'confirm' | 'cancel' | 'submit' | 'custom'`): Specifies the button style and behavior. Default is `'default'`.
- `content` (`string`): The text to display on the button. If not provided, it defaults to a standard text based on the `type` (e.g., "Confirm" for `confirm`).

**Events (Outputs):**
- `buttonClick` (`EventEmitter<void>`): Emitted when the user clicks the button.

**Usage Example:**
```html
<lib-button type="confirm" content="Save Changes" (buttonClick)="onSave()" />
```

### 2. Input (`<lib-input>`)
A standard text input field with optional label and placeholder.

**Attributes (Inputs):**
- `label` (`string`): The label text displayed above the input.
- `type` (`string`): The HTML input type (e.g., `'text'`, `'number'`, `'email'`). Default is `'text'`.
- `placeholder` (`string`): Placeholder text for the input.
- `value` (`string`): The current value of the input field.
- `name` (`string`): The name attribute for the input.
- `id` (`string`): The ID for the input field. Auto-generated if not provided.

**Events (Outputs):**
- `valueChange` (`EventEmitter<string>`): Emitted whenever the user types or changes the value.

**Usage Example:**
```html
<lib-input label="First Name" placeholder="Enter your name" [value]="firstName" (valueChange)="firstName = $event" />
```

### 3. Datepicker (`<lib-datepicker>`)
A date selection input component.

**Attributes (Inputs):**
- `label` (`string`): The label text displayed above the datepicker.
- `name` (`string`): The name attribute for the datepicker.
- `id` (`string`): The ID for the datepicker field. Auto-generated if not provided.
- `selectedDate` (`string`): The currently selected date in `'YYYY-MM-DD'` format.
- `minDate` (`string`): The minimum allowed date (for validation).
- `maxDate` (`string`): The maximum allowed date (for validation).

**Events (Outputs):**
- `selectedDateChange` (`EventEmitter<string>`): Emitted when the selected date changes.

**Usage Example:**
```html
<lib-datepicker label="Claim Date" [selectedDate]="claimDate" maxDate="2024-12-31" (selectedDateChange)="claimDate = $event" />
```

### 4. Select (`<lib-select>`)
A dropdown selection component.

**Attributes (Inputs):**
- `label` (`string`): The label text displayed above the select dropdown.
- `name` (`string`): The name attribute for the select.
- `id` (`string`): The ID for the select field. Auto-generated if not provided.
- `options` (`OptionType[]`): An array of options to display, where each option has `{ value: string | number, content: string }`.
- `selectedOption` (`string | number`): The currently selected value.

**Events (Outputs):**
- `selectedOptionChange` (`EventEmitter<string | number>`): Emitted when the selected option changes.

**Usage Example:**
```ts
// In your component.ts:
statusOptions = [
  { value: 'active', content: 'Active' },
  { value: 'inactive', content: 'Inactive' }
];
```
```html
<!-- In your component.html: -->
<lib-select label="Status" [options]="statusOptions" [selectedOption]="currentStatus" (selectedOptionChange)="currentStatus = $event" />
```

### 5. Tabs (`<lib-tabs>`)
A tabbed navigation component to switch between different views.

**Attributes (Inputs):**
- `tabs` (`string[]`): An array of tab names to display.
- `activeTab` (`string`): The currently active tab name.

**Events (Outputs):**
- `onTabChange` (`EventEmitter<string>`): Emitted with the name of the newly selected tab.

**Usage Example:**
```html
<lib-tabs [tabs]="['Details', 'Comments', 'Audit History']" activeTab="Details" (onTabChange)="currentTab = $event" />
```

### 6. Switch (`<lib-switch>`)
A toggle switch component to alternate between two states.

**Attributes (Inputs):**
- `label` (`string`): The label text displayed above the switch.
- `checked` (`boolean`): The current state of the switch (`true` for ON, `false` for OFF). Default is `false`.
- `name` (`string`): The name attribute for the input.
- `id` (`string`): The ID for the input field. Auto-generated if not provided.

**Events (Outputs):**
- `checkedChange` (`EventEmitter<boolean>`): Emitted when the user toggles the switch.

**Usage Example:**
```html
<lib-switch label="Toggle Active Filter" [checked]="isActive" (checkedChange)="isActive = $event" />
```

---

## Current Implementation Status

### 🛠️ 1. Elementos Base (Core)

- [x] **Botón (`ui-button`)**
  - _Variantes necesarias:_ `primary` (acciones principales), `secondary` (cancelar/volver) y `danger` (para el borrado lógico/soft-delete en Reference Data).
- [x] **Pestañas (`ui-tabs` o `ui-accordion`)**
  - _Uso:_ Indispensable para la vista de detalle en `mfe-claims` (para alternar entre la información del reclamo, los comentarios y el historial de auditoría).

### 📝 2. Controles de Formulario (Form Inputs)

- [x] **Campo de Texto (`ui-input`)**
  - _Uso:_ Para entradas de texto libre (nombres, descripciones) y números (montos asegurados).
- [x] **Menú Desplegable (`ui-select`)**
  - _Uso:_ Para seleccionar el titular de la póliza y los estados fijos (_Status_).
- [x] **Selector de Fecha (`ui-datepicker`)**
  - _Uso:_ Crítico para las historias de usuario que exigen ingresar _"claim date"_ y fechas de cobertura.
- [x] **Interruptor (`ui-toggle` o `ui-switch`)**
  - _Uso:_ Específico para el filtro de activo/inactivo (_"toggle active/inactive filter"_) en Reference Data.
- [ ] **Cascarón de Formulario (`ui-form`)**
  - _Uso:_ Contenedor visual básico con `<ng-content>` para estructurar los campos y los botones de acción (Guardar/Cancelar) de manera uniforme en todos los MFEs.

### 📊 3. Visualización de Datos (Data Display)

- [ ] **Tabla de Datos (`ui-table`)**
  - _Uso:_ Componente base para mostrar las listas de datos (Reference Data, Policies, Claims).
- [ ] **Paginador (`ui-pagination`)**
  - _Uso:_ Controles de "Anterior", "Siguiente" y números de página, requerido explícitamente para las tablas de `mfe-policies` y `mfe-claims`.
- [ ] **Tarjeta Configurables (`ui-card`)**
  - _Uso:_ Contenedor con sombra y bordes para agrupar visualmente la información en las vistas de detalle (`/:id`).
- [ ] **Línea de Tiempo (`ui-timeline`)**
  - _Uso:_ Componente visual cronológico requerido exclusivamente para renderizar el _"audit trail"_ en los reclamos.

### ⚠️ 4. Feedback y Estados (Feedback & States)

- [ ] **Mensaje de Error en línea (`ui-inline-error`)**
  - _Uso:_ Texto rojo o pequeña caja de alerta que aparece debajo/junto a los campos de formulario, cumpliendo la regla estricta de _"The component renders errors inline"_.
- [ ] **Indicador de Carga (`ui-spinner` o `ui-loader`)**
  - _Uso:_ Círculo de carga o barra de progreso para mostrar mientras los servicios Angular hacen las peticiones HTTP (`GET`/`POST`) y para el indicador global del Shell.
