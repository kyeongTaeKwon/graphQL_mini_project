import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../queries/queries";

const AddBook = () => {
  const { loading, error, data: authorData } = useQuery(getAuthorsQuery);

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
  return (
    <form>
      <div className="field">
        <label>Book name</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre</label>
        <input type="text" />
      </div>

      <div className="field">
        <select>
          <option>Select author</option>
          {renderAuthorList()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
