import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const [bookState, setBookState] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const { loading, data: authorData } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  const renderAuthorList = () => {
    if (!loading) {
      return authorData.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    } else {
      return <option disabled>Loading Authors</option>;
    }
  };

  const submitForm = e => {
    e.preventDefault();
    const { name, genre, authorId } = bookState;
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  return (
    <form id="add-book" onSubmit={e => submitForm(e)}>
      <div className="field">
        <label>Book name</label>
        <input
          type="text"
          onChange={e => setBookState({ ...bookState, name: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Genre</label>
        <input
          type="text"
          onChange={e => setBookState({ ...bookState, genre: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          onChange={e =>
            setBookState({ ...bookState, authorId: e.target.value })
          }
        >
          <option>Select author</option>
          {renderAuthorList()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
