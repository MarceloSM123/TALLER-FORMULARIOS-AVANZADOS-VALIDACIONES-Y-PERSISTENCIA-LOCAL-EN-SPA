import { Link } from 'react-router-dom';

function NoEncontrada() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404</h1>
      <h2>PÁGINA NO ENCONTRADA</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default NoEncontrada;