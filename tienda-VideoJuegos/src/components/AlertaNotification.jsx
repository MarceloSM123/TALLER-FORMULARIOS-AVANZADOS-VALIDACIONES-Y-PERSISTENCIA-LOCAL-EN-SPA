import './AlertaNotification.css';

function AlertaNotification({ mostrar, mensaje, tipo = 'success' }) {
  if (!mostrar) return null;

  return (
    <div className={`toast-notificacion toast-${tipo}`}>
      <span className="toast-icon">
        {tipo === 'success' ? '✅' : tipo === 'warning' ? '⚠️' : 'ℹ️'}
      </span>
      <span className="toast-mensaje">{mensaje}</span>
      <div className="toast-progreso"></div>
    </div>
  );
}

export default AlertaNotification;