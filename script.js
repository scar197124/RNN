
async function loadStories(){
  const res = await fetch('stories.json');
  const stories = await res.json();
  stories.sort((a,b)=> new Date(b.timestamp)-new Date(a.timestamp));

  const filterSel=document.getElementById('filterCategory');
  const searchBox=document.getElementById('searchBox');
  const ticker=document.getElementById('ticker');
  const featured=document.querySelector('.featured');
  const grid=document.querySelector('.grid');
  const archiveFeed=document.getElementById('archiveFeed');

  // Ticker
  if(ticker){ticker.innerHTML=stories.map(s=>`<div class='ticker-item'><a href='${s.url}' target='_blank'>${s.headline}</a></div>`).join('');}

  // Filter options
  if(filterSel){
    const cats=[...new Set(stories.map(s=>s.category))];
    filterSel.innerHTML='<option value="">All Categories</option>'+cats.map(c=>`<option>${c}</option>`).join('');
  }

  function renderHomepage(items){
    if(!featured||!grid)return;
    if(!items.length){featured.innerHTML='';grid.innerHTML='';return;}
    const [first,...rest]=items;
    featured.innerHTML=`<article class='featured-card'>
      <div class='breaking-label'>Breaking News</div>
      <div class='badge' style='background:${first.color}'>${first.category}</div>
      <h2>${first.headline}</h2>
      <p>${first.summary}</p>
      <p class='why'>Why it matters: ${first.why}</p>
      <div class='timestamp'>Updated: ${first.timestamp}</div>
      <div class='source'><a href='${first.url}' target='_blank'>${first.source}</a></div>
    </article>`;
    grid.innerHTML=rest.slice(0,14).map(s=>`<article class='card'>
      <div class='badge' style='background:${s.color}'>${s.category}</div>
      <h3>${s.headline}</h3>
      <p>${s.summary}</p>
      <p class='why'>Why it matters: ${s.why}</p>
      <div class='timestamp'>Updated: ${s.timestamp}</div>
      <div class='source'><a href='${s.url}' target='_blank'>${s.source}</a></div>
    </article>`).join('');
  }

  function renderArchive(items){
    if(!archiveFeed)return;
    let out=''; let lastDate='';
    items.forEach(s=>{
      const d=new Date(s.timestamp).toDateString();
      if(d!==lastDate){out+=`<div class='archive-date'>${d}</div>`; lastDate=d;}
      out+=`<article class='card'>
        <div class='badge' style='background:${s.color}'>${s.category}</div>
        <h3>${s.headline}</h3>
        <p>${s.summary}</p>
        <p class='why'>Why it matters: ${s.why}</p>
        <div class='timestamp'>Updated: ${s.timestamp}</div>
        <div class='source'><a href='${s.url}' target='_blank'>${s.source}</a></div>
      </article>`;
    });
    archiveFeed.innerHTML=out;
  }

  function applyFilters(){
    const q=(searchBox?searchBox.value:'').toLowerCase();
    const cat=(filterSel?filterSel.value:'');
    const out=stories.filter(s=>{
      const matchQ=!q||(s.headline+s.summary+s.region+s.category).toLowerCase().includes(q);
      const matchC=!cat||s.category===cat;
      return matchQ&&matchC;
    });
    renderHomepage(out);
  }

  if(featured&&grid){ renderHomepage(stories); }
  if(archiveFeed){ renderArchive(stories); }
  if(filterSel){ filterSel.addEventListener('change',applyFilters); }
  if(searchBox){ searchBox.addEventListener('input',applyFilters); }
}
loadStories();
