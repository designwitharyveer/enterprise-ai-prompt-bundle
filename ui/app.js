const listEl = document.getElementById("promptList");
const titleEl = document.getElementById("promptTitle");
const contentEl = document.getElementById("promptContent");
const searchEl = document.getElementById("search");

let prompts = [];

// Load prompts
fetch("prompts.json")
  .then(res => res.json())
  .then(data => {
    prompts = data;
    renderList(prompts);
  });

function renderList(data) {
  listEl.innerHTML = "";
  data.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.title;
    li.onclick = () => {
      titleEl.textContent = p.title;
      contentEl.textContent = p.content;
    };
    listEl.appendChild(li);
  });
}

// Search
searchEl.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = prompts.filter(p =>
    p.title.toLowerCase().includes(value)
  );
  renderList(filtered);
});

// Copy button
document.getElementById("copyBtn").onclick = () => {
  navigator.clipboard.writeText(contentEl.textContent);
  alert("Prompt copied successfully");
};
