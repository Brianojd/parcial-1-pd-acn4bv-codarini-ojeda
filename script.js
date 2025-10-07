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

const form = document.getElementById('formMedicamento');
const lista = document.getElementById('listaMedicamentos');
const inputBuscar = document.getElementById('buscar');
const listaTips = document.getElementById('listaTips');

let medicamentos = JSON.parse(localStorage.getItem('medicamentos'))?.map(
  m => new Medicamento(m.nombre, m.dosis, m.horario)
) || [];

const mostrarMedicamentos = (arr = medicamentos) => {
  lista.innerHTML = '';
  if (arr.length === 0) {
    lista.innerHTML = '<li>No hay medicamentos registrados.</li>';
    return;
  }
  arr.forEach((m, i) => {
    const li = document.createElement('li');
    li.textContent = m.mostrarInfo();

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌';
    btnEliminar.classList.add('eliminar');
    btnEliminar.addEventListener('click', () => confirmarEliminacion(i));

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
};

const confirmarEliminacion = (i) => {
  if (confirm('¿Seguro que querés eliminar este medicamento?')) {
    medicamentos.splice(i, 1);
    guardarYMostrar();
  }
};

const guardarYMostrar = () => {
  localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
  mostrarMedicamentos();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const dosis = document.getElementById('dosis').value.trim();
  const horario = document.getElementById('horario').value;

  if (!nombre || !dosis || !horario) {
    alert('Por favor completá todos los campos.');
    return;
  }

  const nuevo = new Medicamento(nombre, dosis, horario);
  medicamentos.push(nuevo);
  guardarYMostrar();
  form.reset();
});

inputBuscar.addEventListener('keyup', () => {
  const filtro = inputBuscar.value.toLowerCase();
  const resultado = medicamentos.filter(m =>
    m.nombre.toLowerCase().includes(filtro)
  );
  mostrarMedicamentos(resultado);
});

const cargarTips = async () => {
  try {
    const r = await fetch('mock_api.json');
    if (!r.ok) throw new Error('sin-mock');
    const data = await r.json();
    (data.tips ?? []).forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      listaTips.appendChild(li);
    });
  } catch {
    
    ["Consejo general 1", "Consejo general 2"].forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      listaTips.appendChild(li);
    });
  }
};

mostrarMedicamentos();
cargarTips();
