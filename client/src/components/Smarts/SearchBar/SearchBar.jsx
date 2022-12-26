import React, { useState } from "react";

export default function SearchBar({onSearch = alert}) {
  const [input, setInput] = useState('');

  function handleChange (e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(input);
    setInput('');
  }

  return (
    <form style={{position: 'absolute', right: '1.5rem'}}onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar por nombre o ID..."
        value={input}
        onChange={handleChange}
        style={{margin: '0 10px'}}
      />
      <input type="submit" value="Buscar" />
    </form>
  );
}
