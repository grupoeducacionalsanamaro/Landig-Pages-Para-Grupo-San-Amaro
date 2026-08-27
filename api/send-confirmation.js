const FROM_EMAIL = 'LEVEL UP <levelup@send.sanamaro.cl>';

const ENCUENTRO = {
  numero: '1er encuentro',
  tema: 'Marca personal',
  speaker: 'Bruno Realini',
  fecha: '10 de septiembre de 2026',
  hora: '13:30 hrs (Chile)'
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const body = req.body || {};
  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !emailRe.test(email)) {
    res.status(400).json({ ok: false, error: 'Nombre y email válidos son requeridos.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'Servicio de correo no configurado.' });
    return;
  }

  const safeName = escapeHtml(name);
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif; background:#000000; color:#ffffff; padding:32px;">
      <h1 style="font-size:22px; margin:0 0 16px;">¡Listo, ${safeName}! Ya estás dentro de LEVEL UP 🎉</h1>
      <p style="font-size:15px; line-height:1.6; color:#cccccc;">Tu inscripción quedó confirmada para el primer encuentro del ciclo:</p>
      <table style="width:100%; margin:20px 0; border-collapse:collapse;">
        <tr><td style="padding:6px 0; color:#888888; font-size:13px;">Encuentro</td><td style="padding:6px 0; font-size:15px;">${escapeHtml(ENCUENTRO.numero)} — ${escapeHtml(ENCUENTRO.tema)}</td></tr>
        <tr><td style="padding:6px 0; color:#888888; font-size:13px;">Speaker</td><td style="padding:6px 0; font-size:15px;">${escapeHtml(ENCUENTRO.speaker)}</td></tr>
        <tr><td style="padding:6px 0; color:#888888; font-size:13px;">Fecha</td><td style="padding:6px 0; font-size:15px;">${escapeHtml(ENCUENTRO.fecha)}</td></tr>
        <tr><td style="padding:6px 0; color:#888888; font-size:13px;">Hora</td><td style="padding:6px 0; font-size:15px;">${escapeHtml(ENCUENTRO.hora)}</td></tr>
      </table>
      <p style="font-size:14px; line-height:1.6; color:#999999;">Este es el primero de 5 encuentros mensuales gratuitos. Te avisaremos con anticipación antes de cada sesión.</p>
      <p style="font-size:14px; line-height:1.6; color:#999999; margin-top:24px;">Nos vemos pronto,<br>Equipo LEVEL UP — Grupo Educacional San Amaro</p>
    </div>
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: `Confirmado: ${ENCUENTRO.numero} de LEVEL UP — ${ENCUENTRO.fecha}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend error:', resendRes.status, errText);
      res.status(502).json({ ok: false, error: 'No se pudo enviar el correo de confirmación.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('send-confirmation error:', err);
    res.status(500).json({ ok: false, error: 'No se pudo enviar el correo de confirmación.' });
  }
};
