const container = document.getElementById("prompt-container");
const search = document.getElementById("search");

let prompts = [];

fetch("http://localhost:3000/api/prompts")
  .then(res => res.json())
  .then(data => {
    prompts = data;
    render(prompts);
  });

function render(data) {
  container.innerHTML = "";
  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "prompt";
    div.innerHTML = `<h3>${p.title}</h3><p>${p.content}</p>`;
    container.appendChild(div);
  });
}

search.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  render(prompts.filter(p => p.title.toLowerCase().includes(value)));
});
