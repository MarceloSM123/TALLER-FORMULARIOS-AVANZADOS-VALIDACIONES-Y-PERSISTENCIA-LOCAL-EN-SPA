import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import videojuegosData from './data/videojuegos';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import NoEncontrada from './components/PaginaNoEncontrada';
import './App.css';

function App() {
  const [videojuegos, setVideojuegos] = useState(videojuegosData);

  // Agregar videojuego
  const agregarVideojuego = (nuevoJuego) => {
    setVideojuegos([...videojuegos, nuevoJuego]);
  };

  // Eliminar videojuego
  const eliminarVideojuego = (id) => {
    const filtrados = videojuegos.filter(juego => juego.id !== id);
    setVideojuegos(filtrados);
  };

  // Editar videojuego
  const editarVideojuego = (juegoEditado) => {
    const actualizados = videojuegos.map(juego =>
      juego.id === juegoEditado.id ? juegoEditado : juego
    );
    setVideojuegos(actualizados);
  };

  // Manejar guardado (crear o editar)
  const manejarGuardar = (juego) => {
    const existe = videojuegos.find(j => j.id === juego.id);
    if (existe) {
      editarVideojuego(juego);
    } else {
      agregarVideojuego(juego);
    }
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TablaVideojuegos videojuegos={videojuegos} onEliminar={eliminarVideojuego} />} />
        <Route path="/nuevo" element={<FormularioVideojuego onGuardar={manejarGuardar} />} />
        <Route path="/editar" element={<FormularioVideojuego onGuardar={manejarGuardar} />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;