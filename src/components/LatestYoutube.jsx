import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  `;

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);

  @media (min-width: 650px) {
    border-radius: 5px;
  }
`;

class LatestYoutube extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latestUploadEmbed: ""
    }
  };

  componentDidMount() {
    let reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=");

    fetch(reqURL + 'UC6s6kO27EOyYB1bgXnw9hpQ')
      .then(response => response.json())
      .then(data => {
        let videoUrl = data.items[0].link;
        let videoId = videoUrl.substr(videoUrl.indexOf("v=") + 2);
        this.setState({latestUploadEmbed: "https://youtube.com/embed/" + videoId})
      });
  }

  render() {
    return(
      <Wrapper>
        <Video src={this.state.latestUploadEmbed}
               frameBorder="0"
               allowFullScreen />
      </Wrapper>
    );
  };
};

export default LatestYoutube;
