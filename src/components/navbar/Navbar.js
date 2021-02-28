import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../App";
import SearchIcon from "@material-ui/icons/Search";

const Navbar = () => {
  const { state, setQuery, handleClick } = useContext(AppContext);

  return (
    <Container>
      <Name onClick={() => window.location.reload()}>Photos App</Name>
      <Search>
        <SearchInput>
          <input
            type="text"
            placeholder="Search Photo..."
            value={state.query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Icon onClick={(e) => handleClick(e)} />
        </SearchInput>
      </Search>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  background: rgb(15 15 255 / 60%);
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 2px rgb(3 3 3);
  @media (max-width: 969px) {
    justify-content: space-between;
  }
`;

const Name = styled.div`
  position: absolute;
  left: 1.3em;
  font-size: 1.4em;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  @media (max-width: 969px) {
    position: static;
  }
  @media (max-width: 433px) {
    font-size: 1.2em;
  }
`;

const Search = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    font-size: 1em;
  }
  @media (max-width: 969px) {
    right: 6em;
  }
`;

const SearchInput = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  gap: 0.4em;
  justify-content: center;
  align-items: center;
  input {
    width: 50%;
    padding: 0.7em;
    border: none;
    border-radius: 0.3em;
    ouline: none;
    :focus {
      outline: none;
    }
  }
`;

const Icon = styled(SearchIcon)`
  padding: 0.3em;
  height: 100%;
  cursor: pointer;
  border-radius: 20px;
  :hover {
    background: rgb(0 0 0 / 15%);
  }
`;
