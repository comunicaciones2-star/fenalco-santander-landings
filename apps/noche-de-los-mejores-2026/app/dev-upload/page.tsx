// TEMPORAL - eliminar antes de producción
import { notFound } from 'next/navigation';
import { DevUploadWidget } from './DevUploadWidget';

// Página de prueba sin autenticación para FileUpload — nunca debe quedar
// alcanzable en producción (permitiría subir archivos a R2 con un NIT fijo
// sin pasar por /material/[token] ni por el formulario público).
export default function DevUploadPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return <DevUploadWidget />;
}
