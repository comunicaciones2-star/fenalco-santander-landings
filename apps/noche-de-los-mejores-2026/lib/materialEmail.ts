import { config as eventConfig } from '@/content/event.config';

type Modalidad = 'postulacion' | 'patrocinio';

interface MaterialEmailData {
  nombre: string;
  email: string;
  modalidad: Modalidad;
  token: string;
}

function buildMaterialEmailHtml({ nombre, url, modalidad }: { nombre: string; url: string; modalidad: Modalidad }): string {
  const accion = modalidad === 'postulacion' ? 'postulación' : 'patrocinio';

  return `
    <div style="font-family:Georgia,serif;color:#141310;max-width:560px;margin:0 auto;line-height:1.6;">
      <p>Estimado(a) ${nombre},</p>
      <p>Gracias por tu ${accion} a La Noche de los Mejores 2026, de Fenalco Santander.</p>
      <p>
        Para que el logotipo de tu empresa aparezca en las piezas de comunicación, redes sociales
        e impactos de marca del evento, necesitamos que nos envíes tu material promocional. Si no
        recibimos el logotipo, tu empresa no podrá aparecer en el material del evento.
      </p>
      <p style="margin:28px 0;">
        <a
          href="${url}"
          style="display:inline-block;background:#C7A45D;color:#080A09;padding:12px 26px;text-decoration:none;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;font-size:13px;"
        >
          Enviar material promocional
        </a>
      </p>
      <p style="font-size:13px;color:#4a4a45;">Este enlace está disponible durante los próximos 60 días.</p>
      <hr style="border:none;border-top:1px solid #e0dbcf;margin:24px 0;" />
      <p style="margin:0 0 8px;font-size:13px;color:#4a4a45;">Especificaciones técnicas</p>
      <ul style="margin:0;padding-left:18px;font-size:13px;color:#4a4a45;">
        <li>
          Logotipo: archivo vectorial .ai, .eps, .pdf o .svg; también se acepta .png en alta
          resolución (mínimo 2000 px de lado), con fondo transparente cuando aplique.
        </li>
        <li>
          Video (opcional): formato vertical 1080 x 1920 píxeles, proporción 9:16, máximo 60
          segundos, archivo .mp4 o .mov.
        </li>
      </ul>
      <p style="margin-top:28px;">Cordialmente,<br />Equipo de Fenalco Santander</p>
    </div>
  `;
}

export async function sendMaterialEmail({ nombre, email, modalidad, token }: MaterialEmailData): Promise<void> {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  const url = `${eventConfig.seo.canonical}/material/${token}`;

  const result = await resend.emails.send({
    from: process.env.LEADS_FROM_EMAIL ?? 'onboarding@resend.dev',
    to: email,
    subject: 'La Noche de los Mejores 2026 · Envío de material promocional',
    html: buildMaterialEmailHtml({ nombre, url, modalidad }),
  });

  if (result.error) throw new Error(result.error.message);
}
