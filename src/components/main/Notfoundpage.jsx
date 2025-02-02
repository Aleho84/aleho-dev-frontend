'use client';

// components/main/Notfoundpage.jsx
import ErrorDisplay from '../child/ErrorDisplay';

export default function NotFoundPage() {
  return (
    <ErrorDisplay
      title="¡Ups! La ruta no existe"
      message="Lo sentimos, la ruta seleccionada no existe."
    />
  );
}
