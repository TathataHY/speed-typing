import { Caret } from "../components";
import cn from "classnames";

export const UserTypings = ({
  userInput,
  className,
  words,
}: {
  userInput: string;
  className?: string;
  words: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((character, index) => (
        <Character
          key={`${character}_${index}`}
          character={character}
          expected={words[index]}
        />
      ))}
      <Caret />
    </div>
  );
};

const Character = ({
  character,
  expected,
}: {
  character: string;
  expected: string;
}) => {
  const isCorrect = character === expected;
  const isWhitespace = expected === " ";

  return (
    <span
      className={cn({
        "text-red-500": !isCorrect && !isWhitespace,
        "text-primary-500": isCorrect && !isWhitespace,
        "bg-red-500/50": !isCorrect && isWhitespace,
      })}
    >
      {expected}
    </span>
  );
};
