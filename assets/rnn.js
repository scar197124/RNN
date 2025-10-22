async function loadRNN(){
  const res = await fetch('data.json');
  const data = await res.json();
  const visible = data.today.visible || [];
  const hidden = data.today.hidden || [];

  const visGrid = document.querySelector('#visible-grid');
  const hidGrid = document.querySelector('#hidden-grid');
  const lastUpdated = document.querySelector('#last-updated');

  lastUpdated.textContent = data.meta.last_updated;

  function card(s){
    const cat = s.category || '';
    const color = s.color || '#3b82f6';
    const region = s.region || '';
    const src = s.source || '';
    const url = s.url || '#';
    const date = s.date || '';

    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <div class="badges">
        <span class="badge">${date}</span>
        <span class="badge">${region}</span>
        <span class="badge color" style="background:${color}">${cat}</span>
      </div>
      <h3>${s.headline}</h3>
      <p>${s.summary || ''}</p>
      <p class="why">Why it matters: ${s.why || ''}</p>
      <div class="footer">
        <a class="link" href="${url}" target="_blank" rel="noopener">Source: ${src}</a>
      </div>
    `;
    return el;
  }

  visible.forEach(s => visGrid.appendChild(card(s)));
  hidden.forEach(s => hidGrid.appendChild(card(s)));

  document.querySelector('#see-more-btn').addEventListener('click', () => {
    document.querySelector('.hidden-wrap').style.display = 'block';
    document.querySelector('.see-more').style.display = 'none';
    window.scrollTo({ top: document.querySelector('.hidden-wrap').offsetTop - 20, behavior: 'smooth' });
  });

  document.querySelector('#collapse-btn').addEventListener('click', () => {
    document.querySelector('.hidden-wrap').style.display = 'none';
    document.querySelector('.see-more').style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', loadRNN);