import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Nav = styled.nav`
  text-align: center;
`;

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Li = styled.li`
  display: inline;
  margin: 0 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;

  &:hover {
    color: #0056b3;
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>Co-working Space Booking System</Title>
      <Nav>
        <Ul>
          <Li>
            <StyledLink to="/book-desk">Book a Desk</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/dashboard">Dashboard</StyledLink>
          </Li>
        </Ul>
      </Nav>
    </Container>
  );
};

export default Home;
