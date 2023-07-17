import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

import { levelRanks } from "../../hooks/useMemoryGameLogic";
import { useMemoryGame } from "../../context/MemoryGameContext";

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item className="SelectItem" {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

const GameOptions = () => {
  const { restartGame, gameLevel, setGameLevel, cards, matchedCards } =
    useMemoryGame();

  const isSelectDisabled = cards.length === matchedCards.length;

  return (
    <div style={{ width: "200px" }}>
      <Select.Root
        value={gameLevel}
        onValueChange={setGameLevel}
        disabled={isSelectDisabled}
      >
        <Select.Trigger className="SelectTrigger" disabled={isSelectDisabled}>
          <Select.Value aria-label={gameLevel}>
            {levelRanks[gameLevel]}
          </Select.Value>
          <Select.Icon className="SelectIcon">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="SelectContent">
            <Select.ScrollUpButton className="SelectScrollButton">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="SelectViewport">
              <Select.Group>
                <Select.Label className="SelectLabel">Game level</Select.Label>
                {levelRanks.map((level) => (
                  <SelectItem key={level.cards} value={level.cards}>
                    {level.levelName}
                  </SelectItem>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <button className="restart-button" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
};

export default GameOptions;
