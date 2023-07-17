import * as HoverCard from "@radix-ui/react-hover-card";

import avatarImage from "../../../assets/avatar.png";
import "./styles.scss";

const HoverPlayerCard = () => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="ImageContainer">
          <img className="Image large" src={avatarImage} alt="Your Avatar" />
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="HoverCardContent" sideOffset={5}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div className="ImageContainer">
              <img
                className="Image normal"
                src={avatarImage}
                alt="Your Avatar"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <div>
                <div className="Text bold">Game player</div>
                <div className="Text faded">
                  <a
                    href="https://github.com/Smolchenko"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Owner Github"
                  >
                    @irene_smolchenko
                  </a>
                </div>
              </div>
              {/* <div className="Text">
              Components, icons, colors, and templates for building
              high-quality, accessible UI. Free and open-source.
            </div> */}
              <div style={{ display: "flex", gap: 15 }}>
                <div style={{ display: "flex", gap: 5 }}>
                  <div className="Text bold">0</div>{" "}
                  <div className="Text faded">Wins</div>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <div className="Text bold">0</div>{" "}
                  <div className="Text faded">Attempts</div>
                </div>
              </div>
            </div>
          </div>
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default HoverPlayerCard;
