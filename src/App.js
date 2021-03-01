import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "./components/navbar/Navbar";
import Photos from "./components/photos/Photos";
import Loader from "react-loader-spinner";

const initialState = {
  query: "random images",
  data: [],
  loading: false,
  notFound: false,
};

const reducer = (state, action) => {
  if (action.type === "SET_DATA") {
    return { ...state, data: action.payload };
  }
  if (action.type === "SET_INPUT") {
    return { ...state, query: action.payload };
  }
  if (action.type === "SET_LOADING") {
    return { ...state, loading: action.payload };
  }
  if (action.type === "SET_NOTFOUND") {
    return { ...state, notFound: action.payload };
  }
};

export const AppContext = React.createContext();

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setQuery = (query) => {
    dispatch({ type: "SET_INPUT", payload: query });
  };

  const setData = (data) => {
    dispatch({ type: "SET_DATA", payload: data });
  };

  const setLoading = (loading) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setNotFound = (data) => {
    dispatch({ type: "SET_NOTFOUND", payload: data });
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchData(state.query);
  };

  const fetchData = async (query) => {
    setLoading(true);
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=9`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      }
    );
    const data = await response.json();
    setLoading(false);
    setData(data);
    setQuery("");
  };

  const fetchNextPage = async (data) => {
    if (data.next_page) {
      setLoading(true);
      setNotFound(false);
      const response = await fetch(`${data.next_page}`, {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      });
      const newData = await response.json();
      setLoading(false);
      setData(newData);
    }
  };

  const fetchPrevPage = async (data) => {
    if (data.prev_page) {
      setLoading(true);
      const response = await fetch(`${data.prev_page}`, {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      });
      const newData = await response.json();
      setLoading(false);
      setData(newData);
    }
  };

  useEffect(() => {
    fetchData(state.query);
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        setData,
        fetchData,
        fetchNextPage,
        fetchPrevPage,
        setQuery,
        handleClick,
      }}
    >
      <Container>
        <Navbar />
        {state.loading ? (
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ) : (
          <Photos />
        )}
      </Container>
    </AppContext.Provider>
  );
}

export default App;

const Container = styled.div`
  background: #eee;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;
