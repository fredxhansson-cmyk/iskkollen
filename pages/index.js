import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ORG_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"ISK Guiden\",\"url\":\"https://iskkollen.vercel.app\",\"logo\":\"https://iskkollen.vercel.app/favicon.ico\",\"description\":\"Oberoende jämförelsetjänst för svenska konsumenter inom bank.\",\"foundingDate\":\"2026\",\"inLanguage\":\"sv-SE\",\"contactPoint\":{\"@type\":\"ContactPoint\",\"contactType\":\"customer support\",\"url\":\"https://iskkollen.vercel.app/kontakt\"}}";
const WEB_PAGE_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"Bästa ISK för ungdomar 2026\",\"description\":\"Jämför ISK för ungdomar 2026 ✓ Enkel skattehantering ✓ Låg avgift ✓ Uppdaterad 2026\",\"url\":\"https://iskkollen.vercel.app\",\"datePublished\":\"2026-06-24\",\"dateModified\":\"2026-06-24\",\"inLanguage\":\"sv-SE\",\"publisher\":{\"@type\":\"Organization\",\"name\":\"ISK Guiden\",\"url\":\"https://iskkollen.vercel.app\"},\"breadcrumb\":{\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Hem\",\"item\":\"https://iskkollen.vercel.app\"}]}}";
const ITEM_LIST_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"ItemList\",\"name\":\"Bästa ISK för ungdomar 2026 — Jämförelse 2026\",\"description\":\"Jämför ISK-alternativ för ungdomar och välj rätt för framtiden\",\"numberOfItems\":7,\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Avanza\",\"url\":\"https://www.avanza.se\",\"description\":\"Låg avgift och bra utbildningsresurser\",\"feesAndCommissionsSpecification\":\"från 0 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.8\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"709\"}}},{\"@type\":\"ListItem\",\"position\":2,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Nordnet\",\"url\":\"https://www.nordnet.se\",\"description\":\"Gratis courtage för unga investerare\",\"feesAndCommissionsSpecification\":\"från 0 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.7\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"130\"}}},{\"@type\":\"ListItem\",\"position\":3,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"SEB\",\"url\":\"https://www.seb.se\",\"description\":\"Stöd för hållbara investeringar\",\"feesAndCommissionsSpecification\":\"från 0 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.6\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"318\"}}},{\"@type\":\"ListItem\",\"position\":4,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Swedbank\",\"url\":\"https://www.swedbank.se\",\"description\":\"Personlig rådgivning och stöd\",\"feesAndCommissionsSpecification\":\"från 0 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.5\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"215\"}}},{\"@type\":\"ListItem\",\"position\":5,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Handelsbanken\",\"url\":\"https://www.handelsbanken.se\",\"description\":\"Flexibla investeringslösningar\",\"feesAndCommissionsSpecification\":\"från 0 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.4\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"726\"}}},{\"@type\":\"ListItem\",\"position\":6,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Länsförsäkringar\",\"url\":\"https://www.lansforsakringar.se\",\"description\":\"Lokalt fokus och personlig service\",\"feesAndCommissionsSpecification\":\"från 0 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.3\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"784\"}}},{\"@type\":\"ListItem\",\"position\":7,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Sparbanken Syd\",\"url\":\"https://www.sparbankensyd.se\",\"description\":\"Kundägd bank med fokus på hållbarhet\",\"feesAndCommissionsSpecification\":\"från 0 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.2\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"765\"}}}]}";
const ARTICLE_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Bästa ISK för ungdomar 2026\",\"description\":\"Jämför ISK-alternativ för ungdomar och välj rätt för framtiden\",\"datePublished\":\"2026-06-24\",\"dateModified\":\"2026-06-24\",\"author\":{\"@type\":\"Organization\",\"name\":\"ISK Guiden\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"ISK Guiden\"},\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://iskkollen.vercel.app\"}}";
const FAQ_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Vilka är fördelarna med ISK?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"ISK erbjuder enkel skattehantering och möjligheten att spara i aktier och fonder utan kapitalvinstskatt. Det gör sparandet mer effektivt.\"}}]}";

export async function getStaticProps() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.toLocaleDateString('sv-SE', { month: 'long' });
  var updated = now.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
  var fallback = [{"name":"Avanza","url":"https://www.avanza.se","description":"Låg avgift och bra utbildningsresurser","badge":"Bäst totalt","score":"4.8","price":"från 0 kr/mån","pros":["Ingen kontoavgift","Brett utbud av fonder","Användarvänlig app"]},{"name":"Nordnet","url":"https://www.nordnet.se","description":"Gratis courtage för unga investerare","badge":null,"score":"4.7","price":"från 0 kr/mån","pros":["Låg avgift","Bra kundservice","Utmärkt mobilapp"]},{"name":"SEB","url":"https://www.seb.se","description":"Stöd för hållbara investeringar","badge":null,"score":"4.6","price":"från 0 kr/mån","pros":["Hållbara investeringsalternativ","Stabil bank","Bra rådgivning"]},{"name":"Swedbank","url":"https://www.swedbank.se","description":"Personlig rådgivning och stöd","badge":null,"score":"4.5","price":"från 0 kr/mån","pros":["Personlig service","Säker plattform","Brett nätverk av kontor"]},{"name":"Handelsbanken","url":"https://www.handelsbanken.se","description":"Flexibla investeringslösningar","badge":null,"score":"4.4","price":"från 0 kr/mån","pros":["Flexibla lösningar","Stark kundservice","Pålitlig bank"]},{"name":"Länsförsäkringar","url":"https://www.lansforsakringar.se","description":"Lokalt fokus och personlig service","badge":null,"score":"4.3","price":"från 0 kr/mån","pros":["Lokal närvaro","Personlig kontakt","Bra försäkringslösningar"]},{"name":"Sparbanken Syd","url":"https://www.sparbankensyd.se","description":"Kundägd bank med fokus på hållbarhet","badge":null,"score":"4.2","price":"från 0 kr/mån","pros":["Kundägd","Hållbarhetsfokus","Personlig service"]}];
  var items = fallback.slice();

  return {
    props: { providers: items, year: year, month: month, updated: updated },
    revalidate: 86400,
  };
}

export default function Home({ providers, year, month, updated }) {
  const [sortBy, setSortBy] = useState('betyg');
  const [visibleCount, setVisibleCount] = useState(5);
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  

  var extractNum = function(p) {
    if (p.rateValue) return parseFloat(p.rateValue);
    if (p.priceValue) return parseFloat(p.priceValue);
    var m = String(p.price||'').match(/[0-9]+[.,]?[0-9]*/);
    return m ? parseFloat(m[0].replace(',','.')) : 9999;
  };
  var sorted = [...providers].sort(function(a, b) {
    if (sortBy === 'pris') return extractNum(a) - extractNum(b);
    if (sortBy === 'namn') return a.name.localeCompare(b.name, 'sv');
    return parseFloat(b.score||b.rating||0) - parseFloat(a.score||a.rating||0);
  });
  var visible = sorted.slice(0, visibleCount);
  var toggleSelect = function(name) {
    setSelected(function(prev) {
      return prev.includes(name) ? prev.filter(function(n){return n!==name;}) : prev.length < 3 ? prev.concat([name]) : prev;
    });
  };
  var selectedProviders = providers.filter(function(p){return selected.includes(p.name);});

  const pc = '#0369a1';
  const pcLight = '#0369a114';
  const pcMed = '#0369a130';

  const TRACK_BASE = 'https://axiom-engine-production-54c3.up.railway.app/r';
  const SITE_SLUG = 'iskkollen';
  const AffBtn = ({ url, name, primary }) => {
    var href = TRACK_BASE && TRACK_BASE.startsWith('http')
      ? TRACK_BASE + '?p=' + encodeURIComponent(name) + '&url=' + encodeURIComponent(url) + '&site=' + SITE_SLUG
      : url;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer sponsored"
        style={{ display:'inline-block', background: primary ? pc : '#0f172a', color:'#fff',
          padding:'11px 22px', borderRadius:9, fontWeight:700, fontSize:14,
          textDecoration:'none', whiteSpace:'nowrap', transition:'opacity .15s' }}>
        Välj {name} →
      </a>
    );
  };

  const Stars = ({ score }) => {
    const n = parseFloat(score);
    return (
      <span style={{ fontSize:15, letterSpacing:1 }}>
        <span style={{ color:'#f59e0b' }}>{'★'.repeat(Math.floor(n))}</span>
        <span style={{ color:'#d1d5db' }}>{'★'.repeat(5 - Math.floor(n))}</span>
        <span style={{ color:'#64748b', fontSize:12, marginLeft:6, fontWeight:600 }}>{score}</span>
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Bästa ISK för ungdomar 2026</title>
        <meta name="description" content="Jämför ISK för ungdomar 2026 ✓ Enkel skattehantering ✓ Låg avgift ✓ Uppdaterad 2026" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://iskkollen.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bästa ISK för ungdomar 2026" />
        <meta property="og:description" content="Jämför ISK för ungdomar 2026 ✓ Enkel skattehantering ✓ Låg avgift ✓ Uppdaterad 2026" />
        <meta property="og:url" content="https://iskkollen.vercel.app" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:site_name" content="ISK Guiden" />
        <meta property="og:image" content="https://iskkollen.vercel.app/api/og?title=B%C3%A4sta%20ISK%20f%C3%B6r%20ungdomar%202026&niche=bank" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bästa ISK för ungdomar 2026" />
        <meta name="twitter:description" content="Jämför ISK för ungdomar 2026 ✓ Enkel skattehantering ✓ Låg avgift ✓ Uppdaterad 2026" />
        <meta name="twitter:image" content="https://iskkollen.vercel.app/api/og?title=B%C3%A4sta%20ISK%20f%C3%B6r%20ungdomar%202026&niche=bank" />
        <link rel="alternate" hreflang="sv" href="https://iskkollen.vercel.app" />
        <link rel="alternate" hreflang="x-default" href="https://iskkollen.vercel.app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORG_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEB_PAGE_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ITEM_LIST_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ARTICLE_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      </Head>

      <nav style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'0 20px',
        height:60, display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'sticky', top:0, zIndex:100, fontFamily:'Inter,sans-serif' }}>
        <Link href="/" style={{ fontWeight:800, fontSize:18, color:pc, textDecoration:'none' }}>
          ISK Guiden
        </Link>
        <div style={{ display:'flex', gap:28, fontSize:14 }}>
          <a href="#jamfor" style={{ color:'#64748b', textDecoration:'none' }}>Jämförelse</a>
          <a href="#guide" style={{ color:'#64748b', textDecoration:'none' }}>Guide</a>
          <Link href="/om-oss" style={{ color:'#64748b', textDecoration:'none' }}>Om oss</Link>
        </div>
      </nav>

      <section style={{ background:'linear-gradient(135deg,#f0f9ff 0%,#e8f4fd 50%,#f8fafc 100%)',
        padding:'72px 20px 56px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center',
          gap:48, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:pcLight, color:pc, padding:'4px 12px', borderRadius:20,
                fontSize:12, fontWeight:700 }}>
                ✓ Uppdaterad {updated}
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:'#f0fdf4', color:'#15803d', padding:'4px 12px', borderRadius:20,
                fontSize:12, fontWeight:700 }}>
                ✓ Oberoende jämförelse
              </div>
            </div>
            <h1 style={{ fontSize:'clamp(26px,4vw,46px)', fontWeight:800,
              lineHeight:1.14, marginBottom:18, color:'#0f172a' }}>
              Bästa ISK för ungdomar 2026
            </h1>
            <p style={{ fontSize:18, color:'#475569', lineHeight:1.72,
              marginBottom:32, maxWidth:540 }}>
              Jämför ISK-alternativ för ungdomar och välj rätt för framtiden
            </p>
            <a href="#jamfor" style={{ display:'inline-block', background:pc, color:'#fff',
              padding:'14px 32px', borderRadius:10, fontWeight:700, fontSize:16,
              textDecoration:'none', boxShadow:'0 4px 24px '+pc+'44' }}>
              Välj rätt ISK nu →
            </a>
            <p style={{ marginTop:14, fontSize:13, color:'#94a3b8' }}>
              Gratis &middot; Oberoende &middot; Ingen prenumeration
            </p>
          </div>
          <div style={{ flexShrink:0 }} dangerouslySetInnerHTML={{ __html: "<svg width=\"260\" height=\"210\" viewBox=\"0 0 260 210\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18 178 L62 126 L106 100 L150 60 L194 38 L238 22\" stroke=\"#0369a1\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M18 178 L62 126 L106 100 L150 60 L194 38 L238 22 L238 188 L18 188 Z\" fill=\"#0369a1\" opacity=\"0.07\"/><circle cx=\"62\" cy=\"126\" r=\"5\" fill=\"#0369a1\"/><circle cx=\"106\" cy=\"100\" r=\"5\" fill=\"#0369a1\"/><circle cx=\"150\" cy=\"60\" r=\"5\" fill=\"#0369a1\"/><circle cx=\"194\" cy=\"38\" r=\"5\" fill=\"#0369a1\"/><circle cx=\"238\" cy=\"22\" r=\"5\" fill=\"#0369a1\"/><polygon points=\"228,10 248,32 238,26 238,22 233,22\" fill=\"#0369a1\"/></svg>" }} />
        </div>
      </section>

      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0',
        padding:'16px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'flex',
          gap:32, flexWrap:'wrap', justifyContent:'center', alignItems:'center' }}>
          <div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#0369a1',fontWeight:800,flexShrink:0}}>✓</span><span>Enkel skattehantering</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#0369a1',fontWeight:800,flexShrink:0}}>✓</span><span>Brett investeringsutbud</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#0369a1',fontWeight:800,flexShrink:0}}>✓</span><span>Låg avgift</span></div>
        </div>
      </div>

      <section id="jamfor" style={{ padding:'64px 20px', maxWidth:980,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <h2 style={{ fontSize:30, fontWeight:800, marginBottom:10, color:'#0f172a' }}>
            Jämför ISK-alternativ
          </h2>
          <p style={{ color:'#64748b', fontSize:15 }}>
            Vi har granskat {providers.length} alternativ &mdash; senast uppdaterat {updated}
          </p>
        </div>
        <div style={{ display:'flex', gap:8, marginBottom:20,
          flexWrap:'wrap', justifyContent:'center' }}>
          {['betyg','pris','namn'].map(function(s) { return (
            <button key={s} onClick={() => setSortBy(s)}
              style={{ padding:'7px 18px', borderRadius:20, fontSize:13, fontWeight:600,
                cursor:'pointer', fontFamily:'Inter,sans-serif', border:'none',
                background: sortBy===s ? pc : '#f1f5f9',
                color: sortBy===s ? '#fff' : '#64748b' }}>
              {s==='betyg' ? '⭐ Bäst betyg' : s==='pris' ? '💰 Lägst pris' : '🔤 Namn A–Ö'}
            </button>
          ); })}
        </div>


        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {visible.map((p, i) => (
            <div key={p.name} style={{ background:'#fff', border: i===0 ? '2px solid '+pc : '1px solid #e2e8f0', borderRadius:16, padding:'22px 26px', position:'relative', boxShadow: i===0 ? '0 4px 24px '+pc+'18' : '0 1px 4px #0000000a' }}>
              <div style={{ display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}>
                <div style={{ width:44, height:44, borderRadius:12, background: i===0 ? pcLight : '#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, color: i===0 ? pc : '#64748b', flexShrink:0, border:'1px solid '+(i===0 ? pcMed : '#e2e8f0') }}>
                  {['1','2','3','4','5'][i] || (i+1)}
                </div>
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontWeight:800, fontSize:18, color:'#0f172a', marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontSize:13, color:'#64748b', marginBottom:10 }}>{p.description}</div>
                  {p.pros && <div style={{ display:'flex', flexDirection:'column', gap:5 }}>{p.pros.map((pro, j) => (<div key={j} style={{ display:'flex', gap:7, alignItems:'flex-start', fontSize:13 }}><span style={{ color:pc, fontWeight:700, flexShrink:0 }}>✓</span><span style={{ color:'#374151' }}>{pro}</span></div>))}</div>}
                </div>
                <div style={{ textAlign:'right', minWidth:190, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
                  <div style={{ fontSize:22, fontWeight:800, color:pc }}>{p.currentPrice || p.price}</div>
                  <Stars score={p.score} />
                  <div style={{ background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:8 }}>{p.badge}</div>
                  <AffBtn url={p.url} name={p.name} primary={i===0} />
                  <button onClick={() => toggleSelect(p.name)} style={{ padding:'7px 14px', borderRadius:8, fontSize:12, fontWeight:600, cursor: selected.includes(p.name) || selected.length < 3 ? 'pointer' : 'not-allowed', fontFamily:'Inter,sans-serif', border:'1px solid', borderColor: selected.includes(p.name) ? pc : '#e2e8f0', background: selected.includes(p.name) ? pcLight : '#fff', color: selected.includes(p.name) ? pc : '#64748b', opacity: !selected.includes(p.name) && selected.length >= 3 ? 0.4 : 1 }}>
                    {selected.includes(p.name) ? '✓ Vald' : '+ Jämför'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:20, marginBottom:4, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          {visibleCount < sorted.length && (
            <button onClick={() => setVisibleCount(function(c){ return Math.min(c + 5, sorted.length); })}
              style={{ padding:'10px 28px', borderRadius:24, fontSize:14, fontWeight:700,
                cursor:'pointer', fontFamily:'Inter,sans-serif',
                border:'2px solid '+pc, background:'#fff', color:pc }}>
              Visa 5 fler ↓ &nbsp;<span style={{ fontWeight:400, fontSize:13, opacity:0.7 }}>({sorted.length - visibleCount} återstår)</span>
            </button>
          )}
          {visibleCount >= sorted.length && sorted.length > 5 && (
            <button onClick={() => setVisibleCount(5)}
              style={{ padding:'10px 28px', borderRadius:24, fontSize:14, fontWeight:700,
                cursor:'pointer', fontFamily:'Inter,sans-serif',
                border:'2px solid #e2e8f0', background:'#fff', color:'#64748b' }}>
              Visa färre ↑
            </button>
          )}
          <p style={{ margin:0, fontSize:13, color:'#94a3b8' }}>
            Visar {visible.length} av {sorted.length} alternativ
            {selected.length > 0 && <span style={{ marginLeft:12, color:pc, fontWeight:600 }}>{selected.length} valda för jämförelse</span>}
          </p>
          <p style={{ margin:0, fontSize:11, color:'#cbd5e1' }}>
            Priser är riktpriser — klicka på ett alternativ för aktuellt pris hos respektive leverantör
          </p>
        </div>

        {selected.length >= 2 && (
          <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:80,
            background:'#0f172a', padding:'14px 20px', fontFamily:'Inter,sans-serif',
            display:'flex', alignItems:'center', justifyContent:'center', gap:14, flexWrap:'wrap',
            boxShadow:'0 -4px 32px rgba(0,0,0,0.25)' }}>
            <span style={{ color:'#e2e8f0', fontWeight:600, fontSize:14 }}>
              {selected.length} valda: {selected.join(' vs ')}
            </span>
            <button onClick={() => setShowCompare(true)}
              style={{ background:pc, color:'#fff', border:'none', borderRadius:8,
                padding:'9px 22px', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
              Jämför nu →
            </button>
            <button onClick={() => setSelected([])}
              style={{ background:'transparent', color:'#94a3b8', border:'1px solid #334155',
                borderRadius:8, padding:'9px 14px', fontSize:13, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
              Rensa
            </button>
          </div>
        )}

        {showCompare && (
          <div onClick={() => setShowCompare(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.72)', zIndex:200,
            display:'flex', alignItems:'flex-start', justifyContent:'center',
            padding:'24px 16px', overflowY:'auto', fontFamily:'Inter,sans-serif' }}>
            <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:16,
              width:'100%', maxWidth: selectedProviders.length === 2 ? 700 : 940,
              padding:28, marginTop:12, marginBottom:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
                <h3 style={{ fontSize:20, fontWeight:800, margin:0, color:'#0f172a' }}>
                  Jämförelse — {selectedProviders.map(function(p){return p.name;}).join(' vs ')}
                </h3>
                <button onClick={() => setShowCompare(false)}
                  style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:'#94a3b8' }}>✕</button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns: selectedProviders.map(function(){return '1fr';}).join(' '), gap:14 }}>
                {selectedProviders.map(function(p) { return (
                  <div key={p.name} style={{ border:'2px solid '+pc+'30', borderRadius:12, padding:'20px 18px',
                    display:'flex', flexDirection:'column', gap:10 }}>
                    <div style={{ fontWeight:800, fontSize:17, color:'#0f172a', borderBottom:'1px solid #f1f5f9', paddingBottom:10 }}>{p.name}</div>
                    <div>
                      <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>PRIS</div>
                      <div style={{ fontSize:20, fontWeight:800, color:pc }}>{p.currentPrice||p.price||'—'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>BETYG</div>
                      <Stars score={p.score} />
                    </div>
                    {p.badge && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>UTMÄRKELSE</div>
                        <div style={{ background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:8, display:'inline-block' }}>{p.badge}</div>
                      </div>
                    )}
                    {p.description && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>OM TJÄNSTEN</div>
                        <div style={{ fontSize:13, color:'#475569', lineHeight:1.5 }}>{p.description}</div>
                      </div>
                    )}
                    {p.pros && p.pros.length > 0 && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:6 }}>FÖRDELAR</div>
                        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                          {p.pros.map(function(pro,j){return(
                            <div key={j} style={{ display:'flex', gap:6, fontSize:13 }}>
                              <span style={{ color:pc, fontWeight:700, flexShrink:0 }}>✓</span>
                              <span style={{ color:'#374151' }}>{pro}</span>
                            </div>
                          );})}
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop:'auto', paddingTop:10 }}>
                      <AffBtn url={p.url} name={p.name} primary={true} />
                    </div>
                  </div>
                );})}
              </div>
              <p style={{ marginTop:16, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
                * Stäng för att välja fler alternativ eller byta urval.
              </p>
            </div>
          </div>
        )}

        <p style={{ marginTop:16, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
          * Vi kan erhålla provision vid val via våra länkar. Det påverkar aldrig priset för dig eller våra oberoende betyg.
          Se vår <Link href="/om-oss" style={{ color:pc }}>redaktionspolicy</Link>.
        </p>
      </section>

      

      <section id="guide" style={{ background:'#f8fafc',
        borderTop:'1px solid #e2e8f0', padding:'64px 20px',
        fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontSize:28, fontWeight:800, marginBottom:20, color:'#0f172a' }}>
            Så öppnar du ISK
          </h2>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151', marginBottom:28 }}>
            Att öppna ett ISK för ungdomar är en relativt enkel process, men det finns några steg som är viktiga att följa för att säkerställa att allt går smidigt. Först och främst måste den som öppnar kontot vara myndig, vilket innebär att en förälder eller vårdnadshavare ofta behöver vara delaktig om kontot ska öppnas för en ungdom. Det första steget är att välja en bank eller finansiell institution som erbjuder ett investeringssparkonto. Det är klokt att jämföra olika alternativ baserat på faktorer som kostnader, användarvänlighet och möjligheter till investeringar. När du har valt en leverantör kan du vanligtvis öppna kontot online genom att fylla i de nödvändiga uppgifterna och verifiera din identitet. När kontot är öppnat kan du börja överföra pengar till det och välja vilka investeringar du vill göra. Det kan vara bra att börja med en diversifierad portfölj för att minimera riskerna. Kom ihåg att det är viktigt att regelbundet se över dina investeringar och justera dem vid behov för att nå dina långsiktiga ekonomiska mål.
          </p>
          <h3 style={{ fontSize:22, fontWeight:700, marginBottom:16, color:'#0f172a', marginTop:40 }}>Vanliga misstag</h3>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151', marginBottom:28 }}>När man öppnar ett ISK för ungdomar är det vanligt med vissa misstag som kan undvikas med rätt kunskap. Ett av de vanligaste misstagen är att inte jämföra olika leverantörers erbjudanden ordentligt. Många föräldrar och ungdomar väljer första bästa alternativ utan att tänka på avgifter eller investeringsmöjligheter, vilket kan leda till onödiga kostnader. Ett annat misstag är att inte sätta upp klara mål för sparandet, vilket kan göra det svårare att hålla motivationen uppe. Slutligen är det viktigt att inte glömma bort att regelbundet se över och justera din investeringsstrategi. Marknaden förändras ständigt, och det är viktigt att anpassa sig för att maximera avkastningen och minimera riskerna.</p>
          <h3 style={{ fontSize:20, fontWeight:700, marginBottom:24, color:'#0f172a' }}>
            Vad ska du tänka på?
          </h3>
          <div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#0369a115',color:'#0369a1',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>1</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Jämför alltid avgifter</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#0369a115',color:'#0369a1',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>2</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Sätt tydliga sparmål</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#0369a115',color:'#0369a1',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>3</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Diversifiera investeringarna</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#0369a115',color:'#0369a1',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>4</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Övervaka regelbundet</p></div>
        </div>
      </section>

      <section style={{ padding:'64px 20px', maxWidth:760,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <h2 style={{ fontSize:26, fontWeight:800, marginBottom:32, color:'#0f172a' }}>
          Vanliga frågor
        </h2>
        <details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Vilka är fördelarna med ISK?<span style={{color:'#0369a1',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>ISK erbjuder enkel skattehantering och möjligheten att spara i aktier och fonder utan kapitalvinstskatt. Det gör sparandet mer effektivt.</p></details>
      </section>

      <section style={{ background:'#f8fafc', borderTop:'1px solid #e2e8f0', padding:'32px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <p style={{ fontSize:14, color:'#64748b', marginBottom:12, fontWeight:600 }}>Läs mer:</p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <a href="/utan-avgift" style={{color:'#0369a1',fontWeight:600,textDecoration:'none',fontSize:14}}>Bankkonto utan avgift</a>
            · <a href="/for-unga" style={{color:'#0369a1',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa bankkonto för unga</a>
            · <a href="/sparkonto" style={{color:'#0369a1',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa sparkonto med hög ränta</a>
            · <a href="/isk" style={{color:'#0369a1',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa ISK-konto</a>
          </div>
        </div>
      </section>

      <footer style={{ background:'#0f172a', color:'#94a3b8',
        padding:'52px 20px 32px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:980, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:48, flexWrap:'wrap', marginBottom:36 }}>
            <div style={{ maxWidth:260 }}>
              <div style={{ fontWeight:800, color:'#fff', fontSize:18, marginBottom:10 }}>ISK Guiden</div>
              <p style={{ fontSize:13, lineHeight:1.75 }}>
                Oberoende jämförelsetjänst för svenska konsumenter. Vi jämför 7 alternativ inom bank.
              </p>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Sidor</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/" style={{ color:'#94a3b8', textDecoration:'none' }}>Jämförelse</Link>
                <Link href="/om-oss" style={{ color:'#94a3b8', textDecoration:'none' }}>Om oss</Link>
                <Link href="/kontakt" style={{ color:'#94a3b8', textDecoration:'none' }}>Kontakt</Link>
                <Link href="/integritetspolicy" style={{ color:'#94a3b8', textDecoration:'none' }}>Integritetspolicy</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Se även</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/utan-avgift" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bankkonto utan avgift</Link>
                <Link href="/for-unga" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa bankkonto för unga</Link>
                <Link href="/sparkonto" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa sparkonto med hög ränta</Link>
                <Link href="/isk" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa ISK-konto</Link>
                <Link href="/utomlands" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa bankkort utomlands</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Jämförelser</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/jamfor/avanza-vs-nordnet" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Avanza vs Nordnet</Link>
                <Link href="/jamfor/avanza-vs-seb" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Avanza vs SEB</Link>
                <Link href="/jamfor/avanza-vs-swedbank" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Avanza vs Swedbank</Link>
                <Link href="/jamfor/avanza-vs-handelsbanken" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Avanza vs Handelsbanken</Link>
                <Link href="/jamfor/avanza-vs-lansforsakringar" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Avanza vs Länsförsäkringar</Link>
              </div>
            </div>
          </div>
          <div style={{ borderTop:'1px solid #1e293b', paddingTop:24, fontSize:12, lineHeight:1.75 }}>
            <p style={{ marginBottom:8 }}>
              &copy; {year} ISK Guiden. Oberoende jämförelsetjänst utan koppling till listade
              varumärken utöver eventuella affiliate-provisioner.
            </p>
            <p>
              <strong style={{ color:'#e2e8f0' }}>Affiliateinformation:</strong> Sidan innehåller
              affiliate-länkar via Adtraction Sverige. Vi kan ta emot provision från annonsörer.
              Det påverkar aldrig priset för dig eller våra oberoende betyg.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}