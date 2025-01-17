import quotes from './quotes.js';

const quoteElement = document.getElementById('quote');
const quoteAthorElement = document.getElementById('quote-author');
const generateBtn = document.getElementById('generate-btn');

function generateRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const { quote, author: quoteAuthor } = randomQuote;
  quoteElement.textContent = quote;
  quoteAthorElement.textContent = quoteAuthor;
}

generateBtn.addEventListener('click', generateRandomQuote);
