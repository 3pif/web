import styled from "styled-components";

const ContentWrapper = styled.div`
  position: relative;
  margin: auto;
  max-width: 650px;
  width: ${props => props.fullWidthMobile && "100%" || "90vw"};

  p {
    line-height: 24px;
    font-size: 18px;
  }

  p:not(:last-child) {
    margin-bottom: 24px;
  }

  h2 {
    line-height: 40px;
    margin-bottom: 1em;
    font-size: 30px;
    font-weight: 700;
    display: flex;
  }
`;

export default ContentWrapper;
