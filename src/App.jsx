import React from "react";
import styled from "styled-components";

import Section from "./components/Section";
import ContentWrapper from "./components/ContentWrapper";
import Logo from "./components/Logo";
import Social from "./components/Social";
import LatestYoutube from "./components/LatestYoutube";
import Contact from "./components/Contact";

import studioImage from "./assets/img/studio.jpg";

const socialLinks = [
  {
    type: "youtube",
    url: "https://www.youtube.com/channel/UC6s6kO27EOyYB1bgXnw9hpQ",
    name: "3PIF"
  },
  {
    type: "soundcloud",
    url: "https://soundcloud.com/3pif",
    name: "3PIF"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Section fullHeight elevated color="rgb(68, 74, 81)" foreground="rgb(238, 238, 238)">
          <Logo />
          <Social links={socialLinks} />
        </Section>
        <Section elevated color="rgb(11, 104, 170)" colorTo="rgb(10, 170, 157)" foreground="rgb(238, 238, 238)"
                 stripBottomMobile
                 title="Latest upload" icon="fas fa-headphones">
          <ContentWrapper fullWidthMobile>
            <LatestYoutube />
          </ContentWrapper>
        </Section>
        {/* TODO <Section color="#fff" foreground="#000"
                 title="Upcoming events" icon="fas fa-calendar-check">
          <ContentWrapper>
          </ContentWrapper>
        </Section>
        <Section color="#0b68aa" colorTo="#aa0a67" foreground="#eee"
                 title="Bio" icon="fas fa-id-card-alt">
          <ContentWrapper>
          </ContentWrapper>
        </Section>*/}
        <Section lowered color="rgb(170, 10, 103)" colorTo="rgb(11, 104, 170)" foreground="rgb(238, 238, 238)"
                 /*image={studioImage}*/
                 title="Say hello" icon="fas fa-paper-plane">
          <ContentWrapper>
            <Contact color="rgb(68, 74, 81)" foreground="rgb(238, 238, 238)" accent="rgb(11, 104, 170)" />
          </ContentWrapper>
        </Section>
        <Section elevated color="rgb(105, 119, 127)" foreground="rgb(238, 238, 238)">
          <Social links={socialLinks} />
        </Section>
        <Section center color="rgb(68, 74, 81)" foreground="rgb(238, 238, 238)">
          ⓒ 3PIF 2020
        </Section>
      </React.Fragment>
    );
  };
};

export default App;
