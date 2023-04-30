let books=[]
function addBook(book){
    let table=$("#bookTable tbody");
    table.append(`
    <tr id="${book.id}">
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td>${book.year}</td>
    <td>${book.quantity}</td>
    <td>
    <button class="mb-1 btn btn-sm btn-warning editbtn" data-id="${book.id}">
    Edit
    </button>
    <button class="mb-1 btn btn-sm btn-danger deletebtn" data-id="${book.id}">
    Delete
    </button>
    </td>
    `);
}

function clearForm(){
    $("#bookTitle").val("");
    $("#author").val("");
    $("#genre").val("");
    $("#year").val("");
    $("#quantity").val("");
}

function genearteID(){
    return Math.floor(Math.random() * 1000000)
}

$(document).on("click","#clearBtn", function(){
    clearForm();
});

$("#bookForm").submit(function(e){
    e.preventDefault();

    let book={
       id: genearteID(),
       title: $("#bookTitle").val(), 
       author: $("#author").val(), 
       genre: $("#genre").val(), 
       year: $("#year").val(), 
       quantity: $("#quantity").val(), 
    };

    books.push(book);
    addBook(book);

    clearForm();
});

$("#editForm").submit(function(e){
    e.preventDefault();

    let bookID = $("#editBookID").val();
    let bookIndex = books.findIndex((book)=>book.id == bookID);
    let book = books[bookIndex];

    book.title = $("#editbookTitle").val();
    book.title = $("#editauthor").val();
    book.title = $("#editgenre").val();
    book.title = $("#edityear").val();
    book.title = $("#editquantity").val();

    let row = $(`#${book.id}`);
    row.find("td:eq(0)").text("Book.title");
    row.find("td:eq(1)").text("Book.author");
    row.find("td:eq(2)").text("Book.genre");
    row.find("td:eq(3)").text("Book.year");
    row.find("td:eq(4)").text("Book.quantity");

    $("#editModal").modal("hide");
});

$(document).on("click",".editBtn", function(){
    let bookID = $(this).data("id");
    let bookIndex = books.findIndex((book) => book.id == bookID);
    let book = books[bookIndex];

    $("#editbookTitle").val(book.title);
    $("#editauthor").val(book.author);
    $("#editgenre").val(book.genre);
    $("#edityear").val(book.year);
    $("#editquantity").val(book.quantity);
    $("#editBookId").val(book.id);

    $("#editModal").modal("show");
});

$(document).on("click","#clsBtn", function() {
    $("#editModal").modal("hide");
});

$(document).on("click",".deleteBtn", function() {
    let bookID = $(this).data("id");
    let bookIndex = books.findIndex((book) => book.id == bookID);
    let book = books[bookIndex];

    if(confirm(`Are you sure you want to delete ${book.title}`)){
        books.splice(bookIndex, 1);
        $(`#${book.id}`).remove();
    }
});
