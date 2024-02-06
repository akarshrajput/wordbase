import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputSearch = function (value) {
    setInputSearch(value);
  };

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
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
          setIsLoading(false);
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
      <Header
        inputSearch={inputSearch}
        onInputSearch={handleInputSearch}
        dataArray={dataArray}
      />
      <Body
        dataArray={dataArray}
        inputSearch={inputSearch}
        isLoading={isLoading}
      />
    </div>
  );
}

function Header({ inputSearch, onInputSearch, dataArray }) {
  return (
    <div className="header">
      <Logo />
      <Search inputSearch={inputSearch} onInputSearch={onInputSearch} />
      <Container dataArray={dataArray} />
    </div>
  );
}

// function Loader() {
//   return (
//     <div>
//       <p>Loading...</p>
//     </div>
//   );
// }

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
        placeholder="Search word (school)"
        value={inputSearch}
        onChange={(e) => onInputSearch(e.target.value)}
      />
    </div>
  );
}

function Container({ dataArray }) {
  return (
    <div className="container-result">
      <p>Results : {dataArray.length}</p>
    </div>
  );
}

function Body({ dataArray, inputSearch, isLoading }) {
  return (
    <div className="word-list-flex">
      <Quote inputSearch={inputSearch} dataArray={dataArray} />
      {dataArray.length > 0 ? (
        dataArray.map((items) => <WordList key={items.id} items={items} />)
      ) : (
        <p></p>
      )}
    </div>
  );
}

function Quote({ inputSearch, dataArray }) {
  if (inputSearch.length === 0) {
    return <div className="quote">Please write something...</div>;
  }
  return (
    <div className="quote">
      Searched for <span>"{inputSearch}"</span> : {dataArray.length}
    </div>
  );
}

function WordList({ items }) {
  const data = items.gloss.split(";");
  const dataSetMain = data[0];
  const firstLetter = dataSetMain.charAt(0).toUpperCase();
  const remainingChars = dataSetMain.slice(1);
  const capitalizedDataSetMain = firstLetter + remainingChars;
  let a = data[1];
  if (data.length === 1) {
    a = "not provided";
  }
  return (
    <div className="word-list-item">
      <p>{items.id}.</p>
      <div className="word-list-item-container">
        <p>{capitalizedDataSetMain}</p>
        <p>Example - {a}</p>
      </div>
    </div>
  );
}
