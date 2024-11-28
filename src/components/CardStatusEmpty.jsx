export default function Botoncito({ texto, onClick }) {  // ¡Me encanta este nombrecito! 
    return (
      <button onClick={onClick}>
        {texto}  
      </button>
    );
  }