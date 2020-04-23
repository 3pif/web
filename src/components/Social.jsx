import React from "react";
import styled from "styled-components";

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
  margin-left: 1.5rem;
  margin-right: 1.5rem;

  @media (max-width: 400px) {
    font-size: 40px;
  }
`;

const Link = styled.a`
  color: rgb(238, 238, 238);
  transition: 0.3s ease;

  &:visited {
    color: rgb(238, 238, 238);
    transition: 0.3s ease;
  }
  &:hover, &:active, &:focus {
    color: ${props => props.brandColor || "rbg(170, 170, 170)"};
    transition: 0.3s ease;
  }
`;

function Entry({ type, url, name }) {
  let icon;
  let color;
  switch (type) {
    case "facebook":
      icon = "fab fa-facebook";
      color = "#5890ff";
      break;
    case "instagram":
      icon = "fab fa-instagram";
      color = "#e03566";
      break;
    case "soundcloud":
      icon = "fab fa-soundcloud";
      color = "#ff5500";
      break;
    case "youtube":
      icon = "fab fa-youtube";
      color = "#dd0000";
      break;
    default:
      return;
  }
  return (
    <EntryWrapper>
      <Link href={url}
            target="_blank" rel="noopener noreferrer"
            brandColor={color}
            aria-label={type}>
        <i className={icon} />
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
