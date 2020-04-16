import React from "react";
import styled from "styled-components";

import logo from "../assets/img/logo.svg";

const LogoWrapper = styled.h1`
  margin: auto;
  max-width: 350px;
`;

function Logo() {
  return (
    <LogoWrapper>
      <img src={logo} alt="3PIF" />
    </LogoWrapper>
  );
}

export default Logo;
