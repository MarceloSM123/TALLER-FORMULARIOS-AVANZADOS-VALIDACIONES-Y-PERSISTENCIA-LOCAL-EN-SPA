import { useNavigate } from 'react-router-dom';
import './TablaVideojuegos.css';

function TablaVideojuegos({ videojuegos, onEliminar }) {
  const navigate = useNavigate();

  const formatearProgreso = (progreso) => `${Math.round(progreso * 100)}%`;

  return (
    <div className="videojuegos-container">
      <div className="videojuegos-header">
        <h2>🎮 Tienda de Videojuegos</h2>
        <p className="total-count">Total: {videojuegos.length} juegos</p>
      </div>

      <div className="tabla-wrapper">
        <table className="videojuegos-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Género</th>
              <th>Plataforma</th>
              <th>Año</th>
              <th>Precio</th>
              <th>Disponible</th>
              <th>Progreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {videojuegos.map((juego) => (
              <tr key={juego.id}>
                <td data-label="ID">{juego.id}</td>
                <td data-label="Título">{juego.titulo}</td>
                <td data-label="Género">{juego.genero}</td>
                <td data-label="Plataforma">{juego.plataforma}</td>
                <td data-label="Año">{juego.lanzamiento}</td>
                <td data-label="Precio">${juego.precio.toFixed(2)}</td>
                <td data-label="Disponible">
                  <span className={`disponible-badge ${juego.disponible ? 'disponible' : 'no-disponible'}`}>
                    {juego.disponible ? "✅ Disponible" : "❌ No disponible"}
                  </span>
                </td>
                <td data-label="Progreso">
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: formatearProgreso(juego.progreso) }}>
                      <span className="progress-text">{formatearProgreso(juego.progreso)}</span>
                    </div>
                  </div>
                </td>
                <td data-label="Acciones" className="acciones-cell">
                  <button className="btn-editar" onClick={() => navigate('/editar', { state: { juego } })}>
                    ✏️ Editar
                  </button>
                  <button className="btn-eliminar" onClick={() => onEliminar(juego.id)}>
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaVideojuegos;