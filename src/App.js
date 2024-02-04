import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [dataArray, setDataArray] = useState([]);

  const handleInputSearch = function (value) {
    setInputSearch(value);
  };

  useEffect(
    function () {
      async function fetchData() {
        try {
          const res = await fetch(
            `https://wordbase.up.railway.app/word/${inputSearch}`
          );
          const data = await res.json();
          if (inputSearch === "") {
            setDataArray([]);
            return;
          }
          setDataArray(data.data.definitions);
          // console.log(data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      fetchData();
    },
    [inputSearch]
  );
  return (
    <div>
      <Header inputSearch={inputSearch} onInputSearch={handleInputSearch} />
      <Body dataArray={dataArray} />
    </div>
  );
}

function Header({ inputSearch, onInputSearch }) {
  return (
    <div className="header">
      <Logo />
      <Search inputSearch={inputSearch} onInputSearch={onInputSearch} />
      <Container />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <p>
        Wordbase<span>by @akarsh</span>
      </p>
    </div>
  );
}

function Search({ inputSearch, onInputSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search Word eg. school"
        value={inputSearch}
        onChange={(e) => onInputSearch(e.target.value)}
      />
    </div>
  );
}

function Container() {
  return <div></div>;
}

function Body({ dataArray }) {
  return (
    <div className="word-list-flex">
      {dataArray.length > 0 ? (
        dataArray.map((items) => <WordList key={items.id} items={items} />)
      ) : (
        <p></p>
      )}
    </div>
  );
}

function WordList({ items }) {
  const data = items.gloss.split(";");
  const dataSetMain = data[0];
  const firstLetter = dataSetMain.charAt(0).toUpperCase();
  const remainingChars = dataSetMain.slice(1);
  const capitalizedDataSetMain = firstLetter + remainingChars;
  return (
    <div className="word-list-item">
      <p>{items.id}.</p>
      <div className="word-list-item-container">
        <p>{capitalizedDataSetMain}</p>
        <p>Example - {data[1]}</p>
      </div>
    </div>
  );
}
