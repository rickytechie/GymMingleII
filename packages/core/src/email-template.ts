export interface ItineraryEmailData {
  email: string
  sweatVenue: { name: string; address: string; rating: number }
  nourishVenue: { name: string; address: string; rating: number }
  unwindVenue: { name: string; address: string; rating: number }
  duration: string
  city: string
}

export function buildItineraryEmailHtml(data: ItineraryEmailData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; color: #fff; font-family: 'Courier New', monospace; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
    .logo { font-size: 28px; font-weight: 900; letter-spacing: -1px; color: #CCFF00; text-transform: uppercase; border: 2px solid #CCFF00; display: inline-block; padding: 4px 16px; }
    .badge { display: inline-block; border: 2px solid #CCFF00; background: #CCFF00; color: #000; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; padding: 4px 12px; margin: 20px 0 12px; }
    h1 { font-size: 32px; font-weight: 900; letter-spacing: -1px; margin-bottom: 8px; text-transform: uppercase; }
    .sub { color: #666; font-size: 14px; margin-bottom: 32px; border-bottom: 2px solid #333; padding-bottom: 16px; }
    .stage { border: 2px solid #333; padding: 20px; margin-bottom: 16px; }
    .stage-icon { font-size: 24px; margin-bottom: 8px; }
    .stage-label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #CCFF00; }
    .stage-name { font-size: 20px; font-weight: 900; margin: 4px 0; }
    .stage-addr { font-size: 13px; color: #666; }
    .stage-rating { font-size: 12px; color: #999; margin-top: 4px; }
    .footer { margin-top: 40px; border-top: 2px solid #333; padding-top: 20px; font-size: 11px; color: #555; text-align: center; }
    .btn { display: inline-block; border: 2px solid #CCFF00; background: #CCFF00; color: #000; padding: 12px 24px; font-weight: 900; font-size: 14px; text-decoration: none; margin: 24px 0; text-transform: uppercase; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="container">
    <span class="logo">GYMMINGLE</span>
    <div class="badge">Your Curated Date</div>
    <h1>Sweat → Nourish → Unwind</h1>
    <p class="sub">${data.city} · ${data.duration} · Powered by MingleCoins</p>

    <div class="stage">
      <div class="stage-icon">🏋️</div>
      <div class="stage-label">Stage 1: Sweat</div>
      <div class="stage-name">${escapeHtml(data.sweatVenue.name)}</div>
      <div class="stage-addr">${escapeHtml(data.sweatVenue.address)}</div>
      <div class="stage-rating">⭐ ${data.sweatVenue.rating.toFixed(1)}</div>
    </div>

    <div class="stage">
      <div class="stage-icon">🍽️</div>
      <div class="stage-label">Stage 2: Nourish</div>
      <div class="stage-name">${escapeHtml(data.nourishVenue.name)}</div>
      <div class="stage-addr">${escapeHtml(data.nourishVenue.address)}</div>
      <div class="stage-rating">⭐ ${data.nourishVenue.rating.toFixed(1)}</div>
    </div>

    <div class="stage">
      <div class="stage-icon">💆</div>
      <div class="stage-label">Stage 3: Unwind</div>
      <div class="stage-name">${escapeHtml(data.unwindVenue.name)}</div>
      <div class="stage-addr">${escapeHtml(data.unwindVenue.address)}</div>
      <div class="stage-rating">⭐ ${data.unwindVenue.rating.toFixed(1)}</div>
    </div>

    <div style="text-align:center">
      <a href="https://gymmingle-ii.vercel.app" class="btn">Plan Another Date</a>
    </div>

    <div class="footer">
      <p>Built and Designed by RKYRNSM | RICKY RANSOM, LLC</p>
      <p>&copy; 2026 RICKY RANSOM, LLC · All rights reserved.</p>
      <p style="margin-top:8px">You received this because you requested a date itinerary from GymMingle.</p>
    </div>
  </div>
</body>
</html>`
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
