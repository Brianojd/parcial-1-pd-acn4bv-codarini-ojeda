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

const crearItem = (m, i) => {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = m.mostrarInfo();

 
  const btnEditar = document.createElement('button');
  btnEditar.textContent = '✏️';
  btnEditar.title = 'Editar';
  btnEditar.addEventListener('click', () => {
    const nuevaDosis = prompt('Nueva dosis:', m.dosis);
    if (nuevaDosis === null) return; // canceló
    const nuevoHorario = prompt('Nuevo horario (HH:MM):', m.horario);
    if (nuevoHorario === null) return;

    const d = nuevaDosis.trim();
    const h = nuevoHorario.trim();
    if (!d || !h) return alert('Los campos no pueden quedar vacíos.');

 
    if (!/^\d{2}:\d{2}$/.test(h)) return alert('Formato de hora inválido (usa HH:MM).');

   
    medicamentos[i].dosis = d;
    medicamentos[i].horario = h;
    guardarYMostrar();
  });

 
  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = '❌';
  btnEliminar.classList.add('eliminar');
  btnEliminar.title = 'Eliminar';
  btnEliminar.addEventListener('click', () => confirmarEliminacion(i));

  li.append(span, btnEditar, btnEliminar);
  return li;
};

const mostrarMedicamentos = (arr = medicamentos) => {
  lista.innerHTML = '';
  if (!arr.length) {
    lista.innerHTML = '<li>No hay medicamentos registrados.</li>';
    return;
  }
  arr.forEach((m, i) => {
    lista.appendChild(crearItem(m, i));
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

  const existe = medicamentos.some(m =>
    m.nombre.toLowerCase() === nombre.toLowerCase() && m.horario === horario
  );
  if (existe) {
    alert('Ese medicamento ya existe para ese horario.');
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
    
    ["comuniquese con su médico de confianza",].forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      listaTips.appendChild(li);
    });
  }
};


mostrarMedicamentos();
cargarTips();
