import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";
const BookDetail = ({ bookId }) => {
  const { data, loading } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  const renderBookDetails = () => {
    if (!loading && bookId !== "") {
      const { name, genre, author } = data.book;
      return (
        <div>
          <h2>{name}</h2>
          <p>{genre}</p>
          <p>{author.name}</p>
          <p>All Books by this author:</p>
          <ul className="other-books">
            {author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    }
  };
  !loading && console.log(data);
  return <div id="book-details">{renderBookDetails()}</div>;
};

export default BookDetail;
