
function renderStories(stories, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  stories.forEach(story => {
    const card = document.createElement("div");
    card.className = "story-card";
    card.innerHTML = `
      <div class="story-category" style="background:${story.color || "#ccc"}">
        ${story.category || ""}
      </div>
      <h3>${story.headline}</h3>
      <p>${story.summary}</p>
      <small><b>${story.region || ""}</b> – ${story.date || ""}</small><br>
      <a href="${story.url}" target="_blank">Read More</a>
    `;
    container.appendChild(card);
  });
}

let allStories = [];
let visibleCount = 20;

// Load stories.json on page load
fetch("stories.json")
  .then(res => res.json())
  .then(data => {
    allStories = data;
    renderStories(allStories.slice(0, visibleCount), "stories-container");

    // Show "See More" button only if there are more stories
    if (allStories.length > visibleCount) {
      document.getElementById("see-more").style.display = "block";
    }
  });

// Handle "See More" button click
document.getElementById("see-more").addEventListener("click", () => {
  visibleCount += 20;
  renderStories(allStories.slice(0, visibleCount), "stories-container");

  if (visibleCount >= allStories.length) {
    document.getElementById("see-more").style.display = "none";
  }
});
