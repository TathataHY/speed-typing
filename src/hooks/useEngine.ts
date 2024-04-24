import { useCallback, useEffect, useState } from "react";
import useWords from "../hooks/useWords";
import useCountdownTimer from "../hooks/useCountdownTimer";
import useTypings from "../hooks/useTypings";
import { countErrors } from "../utils/helpers";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdownTimer(COUNTDOWN_SECONDS);
  const { typed, cursor, totalTyped, clear, reset } = useTypings(
    state !== "finish"
  );
  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((errors) => errors + countErrors(typed, wordsReached));
  }, [typed, cursor, words]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, cursor, startCountdown]);

  useEffect(() => {
    if (!timeLeft) {
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, sumErrors]);

  useEffect(() => {
    if (areWordsFinished) {
      sumErrors();
      updateWords();
      clear();
    }
  }, [cursor, words, clear, typed, areWordsFinished, updateWords, sumErrors]);

  const restart = useCallback(() => {
    reset();
    resetCountdown();
    updateWords();
    setState("start");
    setErrors(0);
    clear();
  }, [reset, resetCountdown, updateWords, clear]);

  return { state, words, timeLeft, typed, errors, totalTyped, restart };
};

export default useEngine;
