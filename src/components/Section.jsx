import React from "react";
import styled from "styled-components";

const SectionBase = styled.section`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  position: relative;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  color: ${props => props.foreground || "rgb(0, 0, 0)"};
  ${props => props.center && "align-items: center"};
  ${props => props.fullHeight && "min-height: " + window.innerHeight + "px"};
  ${props => props.elevated && "box-shadow: rgba(0,0,0,.25) 0px 4px 8px -1px"};
  ${props => props.lowered && "box-shadow: inset rgba(0,0,0,.25) 0px -4px 8px -1px"};

  ${props => props.stripBottomMobile && `
    @media (max-width: 650px) {
      padding-bottom: 0px;
    }
  `}
`;

const SectionColor = styled(SectionBase)`
  &:before {
    background: ${props => props.color || `transparent`};
  }
`;

const SectionGradiant = styled(SectionBase)`
  &:before {
    background: linear-gradient(120deg, ${props => props.color || `transparent`}, ${props => props.colorTo || `transparent`});
  }
`;

const SectionImage = styled(SectionBase)`
  &:before {
    ${props => props.image && "background-image: url(" + props.image + ")"};
    background-attachment: initial;
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(50%);
  }
`;

const IconWrapper = styled.div`
  margin-right: 24px;
  font-size: 40px;
`;

const Title = styled.h1`
  position: relative;
  margin: 0 auto;
  max-width: 650px;
  width: 90vw;

  line-height: 40px;
  margin-bottom: 1em;
  font-size: 50px;
  font-weight: 300;
  display: flex;

  @media (max-width: 650px) {
    font-size: 40px;
    }
`;

function GetSectionType(props) {
  if (props.location) {

  } else if(props.image) {
    return <SectionImage{...props}>{props.children}</SectionImage>
  } else if(props.color && props.colorTo) {
    return <SectionGradiant {...props}>{props.children}</SectionGradiant>
  } else {
    return <SectionColor {...props}>{props.children}</SectionColor>
  }
}

class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <GetSectionType {...this.props}>
        { this.props.title || this.props.icon ?
          <Title>
            { this.props.icon ?
              <IconWrapper>
                <i className={this.props.icon} />
              </IconWrapper> : null
            }
            {this.props.title}
          </Title> : null
        }
        {this.props.children}
      </GetSectionType>
    )
  }
}

export default Section;
