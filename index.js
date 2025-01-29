import {
  hideFavoriteBtn,
  showFavoriteBtn,
  toggleFavoriteCard,
  showFavoriteCard,
  removeFavoriteCard,
} from './src/handlers/favorites.js';
import { displayCurrentQuote } from './src/handlers/currentQuote.js';
import {
  localStorageSetItem,
  localStorageRemoveItem,
  localStorageGetItem,
  localStorageClear,
} from './src/utils/localStorage.js';
import { getRandomQuote } from './src/handlers/randomQuote.js';
import { removeObjectFromArrayById } from './src/utils/array.js';

const quoteTextElement = document.getElementById('quote-text');
// Очищаем текст внутри элемента от пробелов в начале и конце
quoteTextElement.textContent = quoteTextElement.textContent.trim();

const CURRENT_QUOTE_KEY = 'currentQuote';
const FAVORITE_QUOTES_KEY = 'favoriteQuotes';

const randomQuoteBtn = document.getElementById('random-quote-btn');
const quoteFavoriteBtn = document.getElementById('quote-favorite-btn');
const favoritesContainer = document.getElementById('favorites-container');

let currentQuote = null;
const favoriteQuotes = [];

function removeFavoriteQuote(id) {
  if (id === currentQuote.id) {
    toggleCurrentQuote();
  } else {
    removeObjectFromArrayById(favoriteQuotes, id);
    removeFavoriteCard(id);
    localStorageSetItem(FAVORITE_QUOTES_KEY, favoriteQuotes);
  }
  // // The way to find current quote in the HTML in the other module
  // const currentQuote = document.querySelector('[data-current-quote-id]');
  // const currentQuoteId = currentQuote.dataset.currentQuoteId;
}

function toggleCurrentQuote() {
  currentQuote.isFavorite = !currentQuote.isFavorite;
  // toggle favorite icon
  showFavoriteBtn(currentQuote.isFavorite);
  localStorageSetItem(CURRENT_QUOTE_KEY, currentQuote);

  // change local storage favoriteQuotes
  if (currentQuote.isFavorite) {
    favoriteQuotes.push({ ...currentQuote });
  } else {
    removeObjectFromArrayById(favoriteQuotes, currentQuote.id);
  }

  toggleFavoriteCard(currentQuote, favoritesContainer);

  localStorageSetItem(FAVORITE_QUOTES_KEY, favoriteQuotes);
}

function setCurrentQuote(quote) {
  currentQuote = { ...quote };

  currentQuote.isFavorite = !!favoriteQuotes.find(
    (favoriteQuote) => favoriteQuote.id === currentQuote.id
  );

  displayCurrentQuote(currentQuote);
  showFavoriteBtn(currentQuote.isFavorite);
  localStorageSetItem(CURRENT_QUOTE_KEY, currentQuote);
}

hideFavoriteBtn();
quoteFavoriteBtn.addEventListener('click', toggleCurrentQuote);

randomQuoteBtn.addEventListener('click', () =>
  setCurrentQuote(getRandomQuote())
);

function init() {
  const favoriteQuotesFromStorage = localStorageGetItem(FAVORITE_QUOTES_KEY);
  if (favoriteQuotesFromStorage) {
    favoriteQuotesFromStorage.forEach((quote) => {
      favoriteQuotes.push(quote);
      showFavoriteCard(quote, favoritesContainer);
    });
  }

  const currentQuoteFromStorage = localStorageGetItem(CURRENT_QUOTE_KEY);
  if (currentQuoteFromStorage) {
    setCurrentQuote(currentQuoteFromStorage);
  }
}

window.addEventListener('load', init);

export { quoteFavoriteBtn, removeFavoriteQuote };
