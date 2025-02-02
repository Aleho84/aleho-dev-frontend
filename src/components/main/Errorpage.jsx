'use client';

// components/main/Errorpage.jsx
import ErrorDisplay from '../child/ErrorDisplay';

export default function ErrorPage() {
  return (
    <ErrorDisplay
      title="¡Ups! Algo salió mal"
      message="Lo sentimos, ha ocurrido un error inesperado."
    />
  );
}
