import { handleFavorite } from './favorites.js';
import { generateRandomInt } from '../utils/math.js';

function handleQuote(quotes, favoriteQuotes, setCurrentQuote) {
  const randomQuote = chooseRandomQuote(quotes);
  if (favoriteQuotes.find((quote) => quote.id === randomQuote.id)) {
    randomQuote.isFavorite = true;
  }
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

function findQuoteById(quotes, id) {
  return quotes.find((quote) => quote.id === id);
}

export { handleQuote, displayQuote, findQuoteById };
