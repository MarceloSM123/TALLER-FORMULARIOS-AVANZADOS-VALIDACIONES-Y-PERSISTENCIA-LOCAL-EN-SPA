import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TablaVideojuegos.css';

function FormularioVideojuego({ onGuardar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const juegoEditado = location.state?.juego || null;


  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [lanzamiento, setLanzamiento] = useState(2024);
  const [fechaLanzamiento, setFechaLanzamiento] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [calificacion, setCalificacion] = useState(50);
  const [precio, setPrecio] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [progreso, setProgreso] = useState(0);
  

  const [errores, setErrores] = useState({});


  useEffect(() => {
    if (juegoEditado) {
      setTitulo(juegoEditado.titulo || '');
      setGenero(juegoEditado.genero || '');
      setPlataforma(juegoEditado.plataforma || '');
      setLanzamiento(juegoEditado.lanzamiento || 2024);
      setFechaLanzamiento(juegoEditado.fechaLanzamiento || '');
      setSinopsis(juegoEditado.sinopsis || '');
      setCalificacion(juegoEditado.calificacion || 50);
      setPrecio(juegoEditado.precio || '');
      setDisponible(juegoEditado.disponible !== undefined ? juegoEditado.disponible : true);
      setProgreso(juegoEditado.progreso ? juegoEditado.progreso * 100 : 0);
    }
  }, [juegoEditado]);


  const validarFormulario = () => {
    const nuevosErrores = {};
    const fechaActual = new Date().toISOString().split('T')[0];

    
    if (!titulo.trim()) {
      nuevosErrores.titulo = 'El título es obligatorio';
    } else if (titulo.trim().length < 3) {
      nuevosErrores.titulo = 'El título debe tener al menos 3 caracteres';
    }

    if (!genero) {
      nuevosErrores.genero = 'Seleccione un género';
    }

 
    if (!plataforma) {
      nuevosErrores.plataforma = 'Seleccione una plataforma';
    }

   
    if (!fechaLanzamiento) {
      nuevosErrores.fechaLanzamiento = 'La fecha de lanzamiento es obligatoria';
    } else if (fechaLanzamiento > fechaActual) {
      nuevosErrores.fechaLanzamiento = 'La fecha no puede ser futura';
    }


    if (!sinopsis.trim()) {
      nuevosErrores.sinopsis = 'La sinopsis es obligatoria';
    } else if (sinopsis.trim().length < 10) {
      nuevosErrores.sinopsis = 'La sinopsis debe tener al menos 10 caracteres';
    } else if (sinopsis.trim().length > 250) {
      nuevosErrores.sinopsis = 'La sinopsis no puede exceder los 250 caracteres';
    }


    if (!calificacion) {
      nuevosErrores.calificacion = 'La calificación es obligatoria';
    } else if (calificacion < 1 || calificacion > 100) {
      nuevosErrores.calificacion = 'La calificación debe estar entre 1 y 100';
    }

   
    if (!precio) {
      nuevosErrores.precio = 'El precio es obligatorio';
    } else if (Number(precio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return; // Detener envío si hay errores
    }
    
    const nuevoJuego = {
      id: juegoEditado?.id || Date.now(),
      titulo: titulo.trim(),
      genero,
      plataforma,
      lanzamiento: Number(lanzamiento),
      fechaLanzamiento,
      sinopsis: sinopsis.trim(),
      calificacion: Number(calificacion),
      precio: Number(precio),
      disponible,
      progreso: progreso / 100
    };
    
    onGuardar(nuevoJuego);
    navigate('/');
  };

  return (
    <div className="formulario-container">
      <h2>{juegoEditado ? '✏️ Editar Videojuego' : '🎮 Registrar Nuevo Videojuego'}</h2>
      <form onSubmit={handleSubmit} className="formulario">
        
        {/* Título */}
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: The Legend of Zelda"
            className={errores.titulo ? 'error-input' : ''}
          />
          {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
        </div>

        {/* Género */}
        <div className="form-group">
          <label>Género:</label>
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="">Seleccione...</option>
            <option value="Aventura">Aventura</option>
            <option value="Deportes">Deportes</option>
            <option value="Acción">Acción</option>
            <option value="RPG">RPG</option>
            <option value="Plataformas">Plataformas</option>
          </select>
          {errores.genero && <span className="error-mensaje">{errores.genero}</span>}
        </div>

        {/* Plataforma */}
        <div className="form-group">
          <label>Plataforma:</label>
          <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
            <option value="">Seleccione...</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="PS5">PS5</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="PC">PC</option>
          </select>
          {errores.plataforma && <span className="error-mensaje">{errores.plataforma}</span>}
        </div>

        {/* Fecha de Lanzamiento (type="date") */}
        <div className="form-group">
          <label>Fecha de Lanzamiento:</label>
          <input
            type="date"
            value={fechaLanzamiento}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className={errores.fechaLanzamiento ? 'error-input' : ''}
          />
          {errores.fechaLanzamiento && <span className="error-mensaje">{errores.fechaLanzamiento}</span>}
        </div>

        {/* Año (mantenido por compatibilidad) */}
        <div className="form-group">
          <label>Año de Lanzamiento:</label>
          <input
            type="number"
            value={lanzamiento}
            onChange={(e) => setLanzamiento(e.target.value)}
            min="2000"
            max="2025"
          />
        </div>

        {/* Sinopsis (textarea) */}
        <div className="form-group">
          <label>Sinopsis / Descripción:</label>
          <textarea
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
            placeholder="Describe el videojuego (mínimo 10 caracteres, máximo 250)..."
            rows="4"
            className={errores.sinopsis ? 'error-input' : ''}
          />
          <small>Caracteres: {sinopsis.length}/250</small>
          {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
        </div>

        {/* Calificación (number 1-100) */}
        <div className="form-group">
          <label>Calificación (1-100):</label>
          <input
            type="number"
            value={calificacion}
            onChange={(e) => setCalificacion(Number(e.target.value))}
            min="1"
            max="100"
            step="1"
            className={errores.calificacion ? 'error-input' : ''}
          />
          <input
            type="range"
            min="1"
            max="100"
            value={calificacion}
            onChange={(e) => setCalificacion(Number(e.target.value))}
          />
          {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
        </div>

        {/* Precio */}
        <div className="form-group">
          <label>Precio ($):</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className={errores.precio ? 'error-input' : ''}
          />
          {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
        </div>

        {/* Progreso */}
        <div className="form-group">
          <label>Progreso de Descarga: {progreso}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={progreso}
            onChange={(e) => setProgreso(Number(e.target.value))}
          />
        </div>

        {/* Checkbox Disponible */}
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
            />
            Disponible en stock
          </label>
        </div>

        {/* Botones */}
        <div className="form-buttons">
          <button type="submit" className="btn-guardar">💾 Guardar</button>
          <button type="button" className="btn-cancelar" onClick={() => navigate('/')}>❌ Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioVideojuego;