document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prompt-container');

  // specific check to prevent errors if the ID is wrong
  if (!container) {
    console.error("Error: Could not find element with ID 'prompt-container'.");
    return;
  }

  // Fetch the data
  fetch('data/prompts.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(prompts => {
      prompts.forEach(prompt => {
        const card = createPromptCard(prompt);
        container.appendChild(card);
      });
    })
    .catch(error => console.error('Error loading prompts:', error));
});

// Helper function to create the HTML structure safely
function createPromptCard(prompt) {
  const card = document.createElement('div');
  card.className = 'prompt-card';

  // 1. Create Title
  const title = document.createElement('h3');
  title.textContent = prompt.title;

  // 2. Create Badge (Category)
  const badge = document.createElement('span');
  badge.className = 'badge';
  // Fallback to 'Enterprise' if you haven't added categories to your JSON yet
  badge.textContent = prompt.category || 'Enterprise'; 

  // 3. Create Content Paragraph
  const content = document.createElement('p');
  content.textContent = prompt.content;

  // 4. Create Copy Button
  const button = document.createElement('button');
  button.className = 'copy-btn';
  button.textContent = 'Copy Prompt';
  
  // Add Click Event Listener for Copy functionality
  button.addEventListener('click', () => {
    navigator.clipboard.writeText(prompt.content).then(() => {
      // Success Feedback
      const originalText = button.textContent;
      button.textContent = 'Copied! ✅';
      button.classList.add('copied');

      // Reset after 2 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });

  // Assemble the card
  card.appendChild(title);
  card.appendChild(badge);
  card.appendChild(content);
  card.appendChild(button);

  return card;
}
