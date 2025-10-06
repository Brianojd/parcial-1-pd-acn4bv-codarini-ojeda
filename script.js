// Clase con constructor y método
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

// Variables
const form = document.getElementById('formMedicamento');
const lista = document.getElementById('listaMedicamentos');
let medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];

// Función para mostrar los medicamentos en pantalla
function mostrarMedicamentos() {
  lista.innerHTML = '';
  for (let i = 0; i < medicamentos.length; i++) {
    const li = document.createElement('li');
    li.textContent = medicamentos[i].mostrarInfo();
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌';
    btnEliminar.onclick = () => eliminarMedicamento(i);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  }
}

// Agregar medicamento
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const dosis = document.getElementById('dosis').value.trim();
  const horario = document.getElementById('horario').value;

  if (!nombre || !dosis || !horario) return alert('Completa todos los campos.');

  const nuevo = new Medicamento(nombre, dosis, horario);
  medicamentos.push(nuevo);
  localStorage.setItem('medicamentos', JSON.stringify(medicamentos));

  form.reset();
  mostrarMedicamentos();
});

// Eliminar medicamento
function eliminarMedicamento(index) {
  medicamentos.splice(index, 1);
  localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
  mostrarMedicamentos();
}

// Mostrar al cargar
mostrarMedicamentos();
