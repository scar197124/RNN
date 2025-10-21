
(function(){
  const featured=document.querySelector('.featured');
  const grid=document.querySelector('.grid');
  const stories=window.RNN_STORIES||[];
  const updated=window.RNN_UPDATED||'';
  const filterSel=document.getElementById('filterCategory');
  const searchBox=document.getElementById('searchBox');

  function render(items){
    if(!items.length){featured.innerHTML='';grid.innerHTML='';return;}
    const [first,...rest]=items;
    featured.innerHTML=`
      <article class="featured-card">
        <div class="breaking-label">Breaking News</div>
        <div class="badge" style="background:${first.color}">${first.category}</div>
        <h2>${first.headline}</h2>
        <p>${first.summary}</p>
        <p class="why">Why it matters: ${first.why}</p>
        <div class="timestamp">Updated: ${updated}</div>
        <div class="source"><a href="${first.url}" target="_blank">${first.source}</a></div>
      </article>`;
    grid.innerHTML=rest.slice(0,10).map(s=>`
      <article class="card">
        <div class="badge" style="background:${s.color}">${s.category}</div>
        <h3>${s.headline}</h3>
        <p>${s.summary}</p>
        <p class="why">Why it matters: ${s.why}</p>
        <div class="timestamp">Updated: ${updated}</div>
        <div class="source"><a href="${s.url}" target="_blank">${s.source}</a></div>
      </article>`).join('');
  }

  function applyFilters(){
    const q=(searchBox.value||'').toLowerCase();
    const cat=filterSel.value;
    const out=stories.filter(s=>{
      const matchQ=!q||(s.headline+s.summary+s.region+s.category).toLowerCase().includes(q);
      const matchC=!cat||s.category===cat;
      return matchQ&&matchC;
    });
    render(out);
  }

  filterSel.addEventListener('change',applyFilters);
  searchBox.addEventListener('input',applyFilters);

  render(stories);
})();