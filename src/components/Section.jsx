import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BaseSection = styled.section`
  position: relative;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  ${props => props.fullHeight && "min-height: 100vh"};
`;

const ColorSection = styled(BaseSection)`
  color: ${props => props.color.foreground || "#fff"};
  background: ${props => props.color.background || `transparent`};
`;

const ImageSection = styled(BaseSection)`
  color: ${props => props.color.dark.foreground || "#fff"};
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: -1;
    ${props => props.backgroundImage && "background-image: url(" + props.backgroundImage + ")"};
    background-attachment: initial;
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(50%);
  }
`;

const IconWrapper = styled.div`
  margin-right: 24px;
`;

const Title = styled.h1`
  position: relative;
  margin: 0 auto;
  max-width: 650px;
  width: 90vw;

  line-height: 40px;
  margin-bottom: 1em;
  font-size: 30px;
  font-weight: 300;
  display: flex;
`;

function GetSection(props) {
  if (props.location) {
    return <MapSection fullHeight={props.fullHeight} color={props.color}>{props.children}</MapSection>;
  } else if (props.backgroundImage) {
    return <ImageSection fullHeight={props.fullHeight} color={props.color} backgroundImage={props.backgroundImage}>{props.children}</ImageSection>;
  } else {
    return <ColorSection fullHeight={props.fullHeight} color={props.color}>{props.children}</ColorSection>;
  }
}

class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <GetSection fullHeight={this.props.fullHeight} color={this.props.color} backgroundImage={this.props.backgroundImage} location={this.props.location}>
        <Title>
          { this.props.icon ?
            <IconWrapper>
              <FontAwesomeIcon icon={this.props.icon} />
            </IconWrapper>: null
          }
          {this.props.title}
        </Title>
        {this.props.children}
      </GetSection>
    )
  }
}

export default Section;
