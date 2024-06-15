import React from "react";
import styled from "styled-components";

const DeskContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.isBooked ? "#ff6961" : "#77dd77")};
  border: 1px solid #ddd;
  border-radius: 5px;
  pointer-events: none;
`;

const Desk = ({ desk }) => {
  return <DeskContainer isBooked={desk.isBooked}>{desk.id}</DeskContainer>;
};

export default Desk;
