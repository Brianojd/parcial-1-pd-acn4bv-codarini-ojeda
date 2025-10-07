#  MedTrack  
> **Aplicación web para gestión básica de medicamentos – Parcial 1 (Plataformas de Desarrollo)**  

---

##  Descripción general
**MedTrack** es una aplicación web sencilla desarrollada con **HTML, CSS y JavaScript**, que permite al usuario registrar sus medicamentos diarios, editarlos, buscarlos y mantenerlos almacenados de forma persistente mediante `localStorage`.

Además, carga una lista de **consejos de salud** desde un archivo JSON externo usando `fetch` y `async/await`.



---

##  Funcionalidades principales

-  **Agregar medicamento:** nombre, dosis y horario mediante formulario.  
-  **Buscar:** filtro dinámico por nombre.  
-  **Editar:** actualización de dosis y horario desde la lista.  
-  **Eliminar:** con confirmación (`confirm()` como callback).  
-  **Persistencia:** guarda y carga los datos desde `localStorage`.  
-  **Consejos de salud:** obtenidos desde `mock_api.json` con `fetch` y `async/await`.  
-  **Diseño:** interfaz clara y responsiva con colores suaves.

---

## Estructura del proyecto
parcial-1-pd-acn4bv-codarini-ojeda/
├── index.html # Estructura principal de la página
├── style.css # Estilos del sitio
├── script.js # Lógica en JavaScript (clases, DOM, eventos, localStorage)
├── mock_api.json # Archivo JSON con tips de salud
└── README.md # Documentación del proyecto


---

## Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructura de la página |
| **CSS3** | Estilos visuales, colores y layout |
| **JavaScript (ES6)** | Lógica principal del sistema |
| **LocalStorage** | Persistencia de datos |
| **Fetch API** | Lectura de datos externos |
| **JSON** | Estructura de los consejos de salud |

---

##  Modelo de datos (usado ahora)

### Clase `Medicamento`
```js
class Medicamento {
  constructor(nombre, dosis, horario) {
    this.nombre = nombre;
    this.dosis = dosis;
    this.horario = horario;
  }

  mostrarInfo() {
    return `${this.nombre} - ${this.dosis} - ${this.horario}`;
  }
}

