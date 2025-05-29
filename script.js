document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-book-form");
  const booksSection = document.getElementById("books-section");
  const booksList = document.getElementById("books-list");

  // Load books from localStorage or initialize an empty array
  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Render books from localStorage on load
  if (books.length > 0) {
    booksSection.style.display = "block";
    renderBooks();
  }

  function renderBooks() {
    booksList.innerHTML = "";
    books.forEach((book, index) => {
      const div = document.createElement("div");
      div.className = "book-item";
      div.innerHTML = `
        <span>${book.title} by ${book.author}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      booksList.appendChild(div);
    });

    // Attach delete event listeners
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
        if (books.length === 0) {
          booksSection.style.display = "none";
        }
      });
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();

    if (title && author) {
      books.push({ title, author });
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
      form.reset();
      booksSection.style.display = "block";
    }
  });
});
