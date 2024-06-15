import React from "react";
import styled from "styled-components";
import Desk from "./Desk";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
  }
`;

const DeskGrid = ({ desks, onBook }) => {
  return (
    <GridContainer>
      {desks.map((desk) => (
        <Desk key={desk.id} desk={desk} onBook={onBook} />
      ))}
    </GridContainer>
  );
};

export default DeskGrid;
