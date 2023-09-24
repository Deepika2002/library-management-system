document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const cartCount = document.getElementById('cartCount');
    const cartList = document.getElementById('cartList');
    let cart = [];

    function showLoadingSpinner() {
        searchResults.innerHTML = '<div class="loader"></div>';
    }

    function hideLoadingSpinner() {
        searchResults.innerHTML = '';
    }

    function createBookElement(book) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        const title = document.createElement('h3');
        title.textContent = book.title || 'N/A';
        const author = document.createElement('p');
        author.textContent = book.author || 'N/A';
        const publishedYear = document.createElement('p');
        publishedYear.textContent = book.published_year || 'N/A';
        const cover = document.createElement('img');
        cover.src = book.image || 'https://via.placeholder.com/100x150';

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.addEventListener('click', function () {
            addToCart(book);
            updateCartList();
        });

        bookDiv.appendChild(cover);
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(publishedYear);
        bookDiv.appendChild(addToCartButton);
        return bookDiv;
    }

    function loadSuggestions() {
        showLoadingSpinner();
        // Simulate a delay (replace with actual API call)
        setTimeout(() => {
            hideLoadingSpinner();
            fetch('http://openlibrary.org/search.json?q=random&limit=10')
                .then(response => response.json())
                .then(data => {
                    hideLoadingSpinner();
                    const books = data.books;
                    if (books.length > 0) {
                        searchResults.innerHTML = ''; // Clear the existing content
                        books.slice(0, 10).forEach(book => {
                            const bookDiv = createBookElement(book);
                            searchResults.appendChild(bookDiv);
                        });
                    } else {
                        searchResults.textContent = 'No suggestions found.';
                    }
                })
                .catch(error => {
                    hideLoadingSpinner();
                    console.error('Error fetching suggestions:', error);
                    searchResults.textContent = 'An error occurred while fetching data.';
                });
        }, 1000);
    }

    function loadPopularBooks() {
        showLoadingSpinner();
        fetch('http://openlibrary.org/search.json?q=random&limit=10')
            .then(response => response.json())
            .then(data => {
                hideLoadingSpinner();
                const books = data.books;
                if (books.length > 0) {
                    searchResults.innerHTML = ''; // Clear the existing content
                    books.slice(0, 10).forEach(book => {
                        const bookDiv = createBookElement(book);
                        searchResults.appendChild(bookDiv);
                    });
                } else {
                    searchResults.textContent = 'No popular books found.';
                }
            })
            .catch(error => {
                hideLoadingSpinner();
                console.error('Error fetching popular books:', error);
                searchResults.textContent = 'An error occurred while fetching data.';
            });
    }

    function searchBooks(query) {
        showLoadingSpinner();
        fetch(`http://openlibrary.org/search.json?q=${query}`)
            .then(response => response.json())
            .then(data => {
                hideLoadingSpinner();
                const books = data.docs;
                if (books.length > 0) {
                    searchResults.innerHTML = ''; // Clear the existing content
                    books.forEach(book => {
                        const bookDiv = createBookElement(book);
                        searchResults.appendChild(bookDiv);
                    });
                } else {
                    searchResults.textContent = 'No results found.';
                }
            })
            .catch(error => {
                hideLoadingSpinner();
                console.error('Error fetching book data:', error);
                searchResults.textContent = 'An error occurred while fetching data.';
            });
    }

    function addToCart(book) {
        cart.push(book);
        updateCartCount();
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function updateCartList() {
        cartList.innerHTML = '';
        cart.forEach(book => {
            const cartItem = document.createElement('div');
            cartItem.textContent = book.title || 'N/A';
            cartList.appendChild(cartItem);
        });
    }

    searchButton.addEventListener('click', function () {
        const searchText = searchInput.value.trim();
        if (searchText !== '') {
            searchBooks(searchText);
        }
    });

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchText = searchInput.value.trim();
            if (searchText !== '') {
                searchBooks(searchText);
            }
        }
    });

    // Add event listeners for the links
    const suggestionsLink = document.getElementById('suggestions-link');
    const popularBooksLink = document.getElementById('popular-books-link');

    suggestionsLink.addEventListener('click', function (event) {
        event.preventDefault();
        loadSuggestions();
    });

    popularBooksLink.addEventListener('click', function (event) {
        event.preventDefault();
        loadPopularBooks();
    });

    // Load popular books by default
    loadPopularBooks();
});
