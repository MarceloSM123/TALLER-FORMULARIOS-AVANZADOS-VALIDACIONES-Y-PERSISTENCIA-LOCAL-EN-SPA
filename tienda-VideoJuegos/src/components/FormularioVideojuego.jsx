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
  const [precio, setPrecio] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    if (juegoEditado) {
      setTitulo(juegoEditado.titulo);
      setGenero(juegoEditado.genero);
      setPlataforma(juegoEditado.plataforma);
      setLanzamiento(juegoEditado.lanzamiento);
      setPrecio(juegoEditado.precio);
      setDisponible(juegoEditado.disponible);
      setProgreso(juegoEditado.progreso * 100);
    }
  }, [juegoEditado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoJuego = {
      id: juegoEditado?.id || Date.now(),
      titulo,
      genero,
      plataforma,
      lanzamiento: Number(lanzamiento),
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
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Género:</label>
          <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
            <option value="">Seleccione...</option>
            <option value="Aventura">Aventura</option>
            <option value="Deportes">Deportes</option>
            <option value="Acción">Acción</option>
            <option value="RPG">RPG</option>
            <option value="Plataformas">Plataformas</option>
          </select>
        </div>

        <div className="form-group">
          <label>Plataforma:</label>
          <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)} required>
            <option value="">Seleccione...</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="PS5">PS5</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="PC">PC</option>
          </select>
        </div>

        <div className="form-group">
          <label>Año de Lanzamiento:</label>
          <input
            type="number"
            value={lanzamiento}
            onChange={(e) => setLanzamiento(e.target.value)}
            min="2000"
            max="2025"
            required
          />
        </div>

        <div className="form-group">
          <label>Precio ($):</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>

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

        <div className="form-buttons">
          <button type="submit" className="btn-guardar">💾 Guardar</button>
          <button type="button" className="btn-cancelar" onClick={() => navigate('/')}>❌ Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioVideojuego;