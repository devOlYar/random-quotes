function displayCurrentQuote(quote) {
  const { id, text, author, isFavorite } = quote;
  const quoteElement = document.getElementById('quote');
  const quoteTextElement = document.getElementById('quote-text');
  const quoteAthorElement = document.getElementById('quote-author');
  quoteElement.dataset.currentQuoteId = id;
  quoteTextElement.textContent = text;
  quoteAthorElement.textContent = author;
}

export { displayCurrentQuote };
