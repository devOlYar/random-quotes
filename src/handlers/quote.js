import { handleFavorite } from './favorites.js';
import { generateRandomInt } from '../utils.js';

function handleQuote(quotes, setCurrentQuote) {
  const randomQuote = chooseRandomQuote(quotes);
  setCurrentQuote(randomQuote);
  displayQuote(randomQuote);
}

function displayQuote(quote) {
  const { id, text, author, isFavorite } = quote;
  const quoteElement = document.getElementById('quote');
  const quoteTextElement = document.getElementById('quote-text');
  const quoteAthorElement = document.getElementById('quote-author');
  quoteElement.dataset.currentQuoteId = id;
  quoteTextElement.textContent = text;
  quoteAthorElement.textContent = author;
  handleFavorite(isFavorite);
}

function chooseRandomQuote(quotes) {
  const randomIndex = generateRandomInt(quotes.length);
  return quotes[randomIndex];
}

export { handleQuote };
