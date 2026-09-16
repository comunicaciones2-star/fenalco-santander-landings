# VENDE CON VENTAJA

Landing estática en `../vende-con-ventaja.html`, compatible con el despliegue Vercel existente y su ruta `/vende-con-ventaja`. Sin build ni dependencias. Se conserva la arquitectura del repositorio; Next.js + Tailwind era una sugerencia del brief.

## Formularios integrados

- Selector de información o inscripción dentro de la landing. Ambos flujos conservan los datos introducidos al alternar, exigen consentimiento y presentan errores y confirmación en la misma página.
- Requiere `/api/vende-con-ventaja/:tipo` en el mismo origen, implementado en `nexo-satelite-inscripciones/vendeConVentaja.js`. Lee el consentimiento oficial de NEXO; nunca expone la API key. No funciona con un servidor puramente estático ni desde file://.
- Iniciar con `node scripts/dev-vende-con-ventaja.js` desde `fenalco-crm` y abrir `http://127.0.0.1:4173/vende-con-ventaja.html`. El servidor local guarda datos reales en NEXO y envía correos diferenciados al registrar cada nuevo flujo.
- Foto real de Rodrigo Jiménez y fondo tecnológico suministrados por el usuario integrados en hero y sección de experto, con copias WebP optimizadas. Originales conservados sin modificación. `expertPhotoUrl` permite sustituir opcionalmente la foto de la sección de experto.
- Los flyers y elementos con texto incrustado se usan como referencia visual. Títulos, fechas, etapas y botones permanecen como HTML accesible; no se reutiliza el flyer completo como landing.

Se mantienen los cinco valores, las fechas sin año añadido y el perfil del experto. No se afirman condiciones de impuestos, precio por persona, certificados, grabaciones, vencimientos o medios de pago.

Todos los CTA de conversión apuntan a `#inscripcion`. El CTA móvil se oculta cuando el bloque de inscripción está visible. FAQ mediante `details/summary`, navegación por teclado, foco visible y soporte de movimiento reducido.

## Verificación

`node --check vende-con-ventaja/config.js` y `node --check vende-con-ventaja/main.js` desde la raíz del repositorio. Pruebas de integración del proxy, CRM y correos en `fenalco-crm/tests`. Para despliegue público ver `fenalco-crm/docs/vende-con-ventaja.md`.
