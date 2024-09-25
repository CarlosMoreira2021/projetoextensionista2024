
    // Simulando uma lista de livros
    const books = [
        "O Senhor dos Anéis",
        "Harry Potter",
        "Game of Thrones",
        "O Pequeno Príncipe",
        "A Culpa é das Estrelas",
        "Cem Anos de Solidão",
        "Dom Quixote",
        "O Hobbit",
        "O Código Da Vinci",
        "O Morro dos Ventos Uivantes",
        "Os Miseráveis",
        "Moby Dick",
        "Orgulho e Preconceito",
        "A Revolução dos Bichos",
        "1984",
        "O Grande Gatsby"
    ];

    // Função para carregar livros com scroll infinito
    let bookIndex = 0;
    const booksPerLoad = 5;

    function loadBooks() {
        const booksContainer = document.getElementById('books-container');
        for (let i = 0; i < booksPerLoad; i++) {
            if (bookIndex >= books.length) return; // Para de carregar se não houver mais livros
            const book = books[bookIndex];
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <div>
                    <input type="checkbox" id="book${bookIndex}">
                    <label for="book${bookIndex}">${book}</label>
                </div>
                <div class="format-buttons">
                    <button class="pdf-button" onclick="selectFormat('${book}', 'PDF')">PDF</button>
                    <button class="physical-button" onclick="selectFormat('${book}', 'Livro Físico')">Livro físico</button>
                </div>
            `;
            booksContainer.appendChild(bookItem);
            bookIndex++;
        }
    }

    // Carregar os primeiros livros quando a página é carregada
    window.onload = loadBooks;

    // Detectar scroll e carregar mais livros
    document.querySelector('.book-list').addEventListener('scroll', function () {
        const { scrollTop, scrollHeight, clientHeight } = this;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            loadBooks(); // Carregar mais livros
        }
    });

    // Função de busca
    function searchBook() {
        const searchValue = document.getElementById('search').value.toLowerCase();
        const books = document.querySelectorAll('.book-item');

        books.forEach(function(book) {
            const label = book.querySelector('label').innerText.toLowerCase();
            if (label.includes(searchValue)) {
                book.style.display = 'flex';
            } else {
                book.style.display = 'none';
            }
        });
    }

    // Função para selecionar formato de livro
    function selectFormat(book, format) {
        alert(`Você escolheu o formato ${format} para o livro "${book}"`);
    }

    // Função para enviar livros selecionados
    function submitBooks() {
        const selectedBooks = [];
        const books = document.querySelectorAll('.book-item input');

        books.forEach(function(book) {
            if (book.checked) {
                const label = book.nextElementSibling.innerText;
                selectedBooks.push(label);
            }
        });

        alert('Livros selecionados: ' + selectedBooks.join(', '));
    }