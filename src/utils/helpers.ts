export const formatPercentage = (value: number) => {
  return value.toFixed(0) + "%";
};

export const countErrors = (character: string, expected: string) => {
  const expectedCharacters = expected.split("");

  return expectedCharacters.reduce((errors, expectedChar, index) => {
    const actualCharacter = character[index];
    if (expectedChar !== actualCharacter) {
      return errors + 1;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }
  return 0;
};
