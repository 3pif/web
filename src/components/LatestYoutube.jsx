import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
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
        console.log("https://youtube.com/embed/" + videoId);
        this.setState({latestUploadEmbed: "https://youtube.com/embed/" + videoId})
      });
  }

  render() {
    return(
      <Wrapper>
        <iframe width="100%"
                height="100%"
                src={this.state.latestUploadEmbed}
                frameBorder="0"
                allowFullScreen />
      </Wrapper>
    );
  };
};

export default LatestYoutube;
