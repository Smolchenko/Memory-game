import * as HoverCard from "@radix-ui/react-hover-card";

import AvatarImage from "./Avatar";
import HoverCardContent from "./HoverCardContent";
import useIsTouchDevice from "../../../hooks/useIsTouchDevice";

import "./styles.scss";

const HoverPlayerCard = () => {
  const isMobile = useIsTouchDevice();

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="ImageContainer">
          <AvatarImage size="large" />
          {isMobile && <HoverCardContent />}
        </div>
      </HoverCard.Trigger>
      {!isMobile && (
        <HoverCard.Portal>
          <HoverCard.Content className="HoverCardContent" sideOffset={5}>
            <HoverCardContent />
            <HoverCard.Arrow className="HoverCardArrow" />
          </HoverCard.Content>
        </HoverCard.Portal>
      )}
    </HoverCard.Root>
  );
};

export default HoverPlayerCard;
