import { MATRIX_N } from "./const";

export interface BingoType {
  [key: number | string]: number[];
}

export const generateCards = (n: number): string[][] =>
  Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => `${Math.floor(Math.random() * 100)}`)
  );

export const formatRowsToColumns = (tilesList: BingoType): BingoType => {
  const draft = {} as BingoType;
  Object.keys(tilesList).forEach((i) => {
    const numI = Number(i);
    tilesList[i].forEach((j) => {
      if (!draft[j]) {
        draft[j] = [numI];
      } else {
        draft[j].push(numI);
      }
    });
  });
  return draft;
};

export const getDiagonals = (tilesList: BingoType): BingoType => {
  const draftX = [] as number[];
  const draftY = [] as number[];
  Object.keys(tilesList).forEach((i) => {
    const numX = Number(i);
    const numY = MATRIX_N - 1 - Number(i);
    if (tilesList[i].includes(numX)) {
      draftX.push(numX);
    }
    if (tilesList[i].includes(numY)) {
      draftY.push(numY);
    }
  });
  return { x: draftX, y: draftY };
};

export const getWinners = (tilesList: BingoType): string[] =>
  Object.keys(tilesList).filter((i) => tilesList[i].length === MATRIX_N);
