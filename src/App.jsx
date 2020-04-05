import React from "React";

import Section from "./components/Section";
import Logo from "./components/Logo";
import Social from "./components/Social";

const colors = {
  cover: {
    foreground: "#f9f9f9",
    background: "#000",
    interactive: "#333",
    accent: "#0b68aa",
  }
};

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

  render () {
    return (
      <Section fullHeight color={colors.cover}>
        <Logo />
        <Social links={socialLinks} />
      </Section>
    )
  }
}

export default App;