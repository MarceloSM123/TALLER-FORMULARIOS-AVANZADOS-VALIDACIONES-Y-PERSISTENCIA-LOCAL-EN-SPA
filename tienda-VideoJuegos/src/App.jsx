import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import videojuegosData from './data/videojuegos';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import NoEncontrada from './components/PaginaNoEncontrada';
import AlertaNotification from './components/AlertaNotification';
import './App.css';

function App() {
  
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : videojuegosData;
  });

  const [alerta, setAlerta] = useState({ mostrar: false, mensaje: '', tipo: 'success' });

 
  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);

  const mostrarAlerta = (mensaje, tipo = 'success') => {
    setAlerta({ mostrar: true, mensaje, tipo });
    setTimeout(() => {
      setAlerta({ mostrar: false, mensaje: '', tipo: 'success' });
    }, 3000);
  };

  const agregarVideojuego = (nuevoJuego) => {
    setVideojuegos([...videojuegos, nuevoJuego]);
    mostrarAlerta(`✅ "${nuevoJuego.titulo}" agregado correctamente`);
  };

  const eliminarVideojuego = (id) => {
    const juegoEliminado = videojuegos.find(j => j.id === id);
    const filtrados = videojuegos.filter(juego => juego.id !== id);
    setVideojuegos(filtrados);
    mostrarAlerta(`🗑️ "${juegoEliminado?.titulo}" eliminado`, 'warning');
  };

  const editarVideojuego = (juegoEditado) => {
    const actualizados = videojuegos.map(juego =>
      juego.id === juegoEditado.id ? juegoEditado : juego
    );
    setVideojuegos(actualizados);
    mostrarAlerta(`✏️ "${juegoEditado.titulo}" editado correctamente`);
  };

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
      <AlertaNotification 
        mostrar={alerta.mostrar} 
        mensaje={alerta.mensaje} 
        tipo={alerta.tipo} 
      />
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