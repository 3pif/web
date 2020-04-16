import React from "react";

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
  },
  {
    type: "instagram",
    url: "https://www.instagram.com/_3pif/",
    name: "_3pif"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Section fullHeight color="#444a51" foreground="#fff">
          <Logo />
          <Social links={socialLinks} />
        </Section>
        <Section color="#0b68aa" colorTo="#0aaa9d" foreground="#eee"
                 title="Newest uploads" icon="fas fa-gem">
          <ContentWrapper>
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
        <Section color="#0b68aa" colorTo="#aa0a67" foreground="#eee"
                 image={studioImage}
                 title="Say hello" icon="fas fa-comments">
          <ContentWrapper>
            <Contact color="#444a51" foreground="#eee" accent="#0b68aa" />
          </ContentWrapper>
        </Section>
        <Section color="#69777f" foreground="#eee">
          <Social links={socialLinks} />
        </Section>
        <Section center color="#444a51" foreground="#eee">
          ⓒ 3PIF 2020
        </Section>
      </React.Fragment>
    );
  };
};

export default App;
