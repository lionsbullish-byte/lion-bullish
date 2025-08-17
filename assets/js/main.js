
window.LB_CONFIG = { ALPHA_VANTAGE_KEY: "" };

async function stooqLast(symbol){
  const url = `https://stooq.com/q/d/l/?s=${symbol}&i=d`;
  const res = await fetch(url);
  if(!res.ok) return null;
  const text = await res.text();
  const rows = text.trim().split('\n').slice(-1)[0].split(',');
  return parseFloat(rows[4]);
}

async function buildHomeTicker(){
  const el = document.getElementById('tickerTrack');
  if(!el) return;
  try {
    const symbols = ['aapl.us','tsla.us','nvda.us','goog.us','amzn.us'];
    const values = await Promise.all(symbols.map(stooqLast));
    const items = symbols.map((s,i)=>`${s.toUpperCase()} ${values[i]?.toFixed(2) || '—'}`);
    el.innerHTML = items.concat(items).map(x=>`<span>${x}</span>`).join('');
  } catch(e){ el.textContent = 'Ticker unavailable.'; }
}
buildHomeTicker();
