import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const SocialList = styled.ul`
  margin: auto;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
`;

const EntryWrapper = styled.li`
  display: inline-flex;
  flex-direction: row;
  font-size: 3em;
  margin: 1.5rem;

  @media (max-width: 400px) {
    font-size: 40px;
  }
`;

const Link = styled.a`
  color: #ffffff;
  transition: 0.3s ease;

  &:visited {
    color: #ffffff;
    transition: 0.3s ease;
  }
  &:hover, &:active, &:focus {
    color: ${props => props.brandColor || "#aaa"};
    transition: 0.3s ease;
  }
`;

function Entry({ type, url, name }) {
  let icon;
  let color;
  switch (type) {
    case "facebook":
      icon = faFacebook;
      color = "#5890ff";
      break;
    case "instagram":
      icon = faInstagram;
      color = "#e03566";
      break;
    case "soundcloud":
      icon = faSoundcloud;
      color = "#ff5500";
      break;
    case "youtube":
      icon = faYoutube;
      color = "#ff0000";
      break;
    default:
      return;
  }
  return (
    <EntryWrapper>
      <Link href={url} brandColor={color} aria-label={type}>
        <FontAwesomeIcon icon={icon} />
      </Link>
    </EntryWrapper>
  );
}

function Social(props) {
  return (
    <SocialList>
      {props.links.map((entry, i) => (
        <Entry key={i} {...entry} />
      ))}
    </SocialList>
  );
}

export default Social;
