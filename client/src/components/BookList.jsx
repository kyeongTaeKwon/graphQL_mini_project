import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetail from "./BookDetail";
const BookList = () => {
  const [currentBookId, setCurrentBookId] = useState("");
  const { loading, data } = useQuery(getBooksQuery);

  const renderBooksList = () => {
    if (loading) {
      return <li>데이터를 불러오는 중입니다</li>;
    } else {
      return data.books.map(book => (
        <li key={book.id} onClick={e => setCurrentBookId(book.id)}>
          {book.name}
        </li>
      ));
    }
  };
  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
        {renderBooksList()}
      </ul>
      <BookDetail bookId={currentBookId} />
    </div>
  );
};

export default BookList;
