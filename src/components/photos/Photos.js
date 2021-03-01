import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../App";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Photos = () => {
  const { state, fetchNextPage, fetchPrevPage } = useContext(AppContext);

  return (
    <Container>
      <PhotoContainer>
        {state.data.photos
          ? state.data.photos.map((photo) => (
              <Photo key={photo.id}>
                <img src={photo.src.landscape} />
              </Photo>
            ))
          : " "}
      </PhotoContainer>
      <Button>
        <Prev onClick={() => fetchPrevPage(state.data)}>
          <NavigateBeforeIcon />
          <p>Prev</p>
        </Prev>
        <Next onClick={() => fetchNextPage(state.data)}>
          <p>Next</p>
          <NavigateNextIcon />
        </Next>
      </Button>
    </Container>
  );
};

export default Photos;

const Container = styled.div`
  padding: 3em 0 0 0;
  display: grid;
  grid-template-rows: 1fr min-content;
  align-items: center;
  justify-content: center;
`;

const PhotoContainer = styled.div`
  width: 90vw;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2em;
  padding: 1em 1em;
  @media (max-width: 649px) {
    display: flex;
    flex-direction: column;
  }
`;

const Photo = styled.div`
  img {
    border: 4px solid white;
    box-shadow: 0 0 4px rgb(0 0 0);
    width: 100%;
    height: 100%;
  }
`;

const Button = styled.div`
  padding: 2%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.7%;
  @media (max-width: 649px) {
    gap: 3%;
  }
`;

const Prev = styled.div`
  color: #fff;
  font-weight: 500;
  display: flex;
  height: 2.5em;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 255 / 70%);
  padding: 0.2em 0.7em;
  border-radius: 0.3em;
  box-shadow: 0 0 1px rgb(3 3 3 / 50%);
  :hover {
    background: rgb(0 0 170 / 80%);
    cursor: pointer;
  }
  p {
    padding-right: 0.5em;
    margin-top: 0.8em;
  }
`;

const Next = styled.div`
  color: #fff;
  font-weight: 500;
  display: flex;
  height: 2.5em;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 255 / 70%);
  padding: 0.2em 0.7em;
  border-radius: 0.3em;
  box-shadow: 0 0 1px rgb(3 3 3 / 50%);
  :hover {
    background: rgb(0 0 170 / 80%);
    cursor: pointer;
  }
  p {
    padding-left: 0.5em;
    margin-top: 0.8em;
  }
`;
