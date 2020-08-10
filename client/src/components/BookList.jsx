import React from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  const renderBooksList = () => {
    if (loading) {
      return <li>데이터를 불러오는 중입니다</li>;
    } else {
      return data.books.map(book => <li key={book.id}>{book.name}</li>);
    }
  };
  return (
    <div>
      <ul className="book-list">
        <li>Book name</li>
        {renderBooksList()}
      </ul>
    </div>
  );
};

export default BookList;
