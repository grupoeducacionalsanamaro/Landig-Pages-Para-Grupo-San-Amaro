const FROM_EMAIL = 'LEVEL UP <levelup@send.sanamaro.cl>';
const REPLY_TO_EMAIL = 'levelup@sanamaro.cl';
const ASSET_BASE = 'https://levelup.sanamaro.cl/assets';

const ENCUENTRO = {
  numero: '1er encuentro',
  tema: 'Marca personal',
  speaker: 'Bruno Realini',
  speakerPhoto: `${ASSET_BASE}/speaker-bruno-realini.png`,
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
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body style="margin:0; padding:0; background:#000000;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000000;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background:#0B0E17; border-radius:20px; overflow:hidden; border:1px solid #22262f;">

          <tr>
            <td>
              <img src="${ASSET_BASE}/bg-speakers.png" width="600" alt="" style="display:block; width:100%; height:140px; object-fit:cover; border:0;">
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:28px 32px 0;">
              <img src="${ASSET_BASE}/logo-white.png" width="120" alt="LEVEL UP" style="display:block; border:0;">
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 32px 0;">
              <span style="display:inline-block; font-family:'Courier New',monospace; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#ffffff; background:#0A84FF; border-radius:999px; padding:7px 16px;">${escapeHtml(ENCUENTRO.numero)}</span>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:18px 32px 0;">
              <div style="font-family:Arial,Helvetica,sans-serif; font-size:24px; font-weight:bold; color:#ffffff; line-height:1.3;">¡Listo, ${safeName}!</div>
              <div style="font-family:Arial,Helvetica,sans-serif; font-size:15px; color:#9aa0ab; margin-top:6px;">Ya estás dentro de LEVEL UP 🎉</div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#14171F; border:1px solid #262b36; border-radius:16px;">
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="64" valign="top">
                          <img src="${ENCUENTRO.speakerPhoto}" width="56" height="56" alt="${escapeHtml(ENCUENTRO.speaker)}" style="display:block; width:56px; height:56px; border-radius:50%; object-fit:cover; border:0;">
                        </td>
                        <td valign="middle" style="padding-left:14px;">
                          <div style="font-family:Arial,Helvetica,sans-serif; font-size:17px; font-weight:bold; color:#ffffff; line-height:1.3;">${escapeHtml(ENCUENTRO.tema)}</div>
                          <div style="font-family:'Courier New',monospace; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#8a90a0; margin-top:4px;">Con ${escapeHtml(ENCUENTRO.speaker)}</div>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px; border-top:1px solid #262b36;">
                      <tr>
                        <td style="padding-top:18px;">
                          <div style="font-family:'Courier New',monospace; font-size:10px; letter-spacing:1px; text-transform:uppercase; color:#8a90a0;">Fecha</div>
                          <div style="font-family:Arial,Helvetica,sans-serif; font-size:20px; font-weight:bold; color:#ffffff; margin-top:4px;">${escapeHtml(ENCUENTRO.fecha)}</div>
                        </td>
                        <td style="padding-top:18px;" align="right">
                          <div style="font-family:'Courier New',monospace; font-size:10px; letter-spacing:1px; text-transform:uppercase; color:#8a90a0;">Hora</div>
                          <div style="font-family:Arial,Helvetica,sans-serif; font-size:20px; font-weight:bold; color:#ffffff; margin-top:4px;">${escapeHtml(ENCUENTRO.hora)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 0;">
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.6; color:#8a90a0;">Este es el primero de 5 encuentros mensuales gratuitos del ciclo LEVEL UP. Te avisaremos con anticipación antes de cada sesión.</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 32px;">
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.6; color:#5c6270;">Nos vemos pronto,<br>Equipo LEVEL UP — Grupo Educacional San Amaro</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
        reply_to: REPLY_TO_EMAIL,
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
