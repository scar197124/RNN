// Load stories.json and render cards with category icons
const categoryIcons = {
  "Earth": "🌍",
  "Health": "🏥",
  "Kindness": "💛",
  "Breakthroughs": "⚡",
  "Culture": "🎭",
  "Tech": "⚙️"
};

fetch('stories.json')
  .then(response => response.json())
  .then(data => {
    const ticker = document.getElementById('ticker');
    const featured = document.getElementById('featured');
    const grid = document.getElementById('news-grid');

    // limit homepage to 15 stories
    const latestStories = data.slice(0,15);

    // Ticker items
    latestStories.forEach(story => {
      const item = document.createElement('span');
      item.className = 'ticker-item';
      item.innerHTML = `<a href="${story.url}" target="_blank">${story.headline}</a>`;
      ticker.appendChild(item);
    });

    // First story featured
    if(latestStories.length > 0){
      const story = latestStories[0];
      const badgeClass = story.category.toLowerCase();
      const icon = categoryIcons[story.category] || '';
      featured.innerHTML = `
        <article class="featured-card">
          <div class="breaking">Breaking News</div>
          <div class="badge ${badgeClass}">${icon} ${story.category}</div>
          <h2>${story.headline}</h2>
          <p>${story.summary}</p>
          <p class="timestamp">Updated: ${story.timestamp} · Source: <span class="source"><a href="${story.url}" target="_blank">${story.source}</a></span></p>
        </article>
      `;
    }

    // Rest in grid
    latestStories.slice(1).forEach(story => {
      const card = document.createElement('article');
      const badgeClass = story.category.toLowerCase();
      const icon = categoryIcons[story.category] || '';
      card.className = 'card';
      card.innerHTML = `
        <div class="badge ${badgeClass}">${icon} ${story.category}</div>
        <h3>${story.headline}</h3>
        <p>${story.summary}</p>
        <p class="timestamp">Updated: ${story.timestamp} · <span class="source"><a href="${story.url}" target="_blank">${story.source}</a></span></p>
      `;
      grid.appendChild(card);
    });
  });
