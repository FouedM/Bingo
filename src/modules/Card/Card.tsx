import { useEffect, useMemo, useRef, useState } from "react";
import Score from "../../components/score";
import Tile from "../../components/tile";
import {
  BingoType,
  formatRowsToColumns,
  generateCards,
  getDiagonals,
  getWinners,
} from "../../utils/card";
import { MATRIX_N } from "../../utils/const";
import "./Card.css";
import Confetti from "react-confetti";

const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const cards = generateCards(MATRIX_N);
const middleMatrix = Math.floor((MATRIX_N - 1) / 2);

const Card = () => {
  const [selectedTiles, setSelectedTiles] = useState({
    [middleMatrix]: [middleMatrix],
  } as BingoType);

  const handleTile = (i: number, j: number) => {
    const draftTiles = { ...selectedTiles };
    if (i !== j || (i === j && middleMatrix !== i)) {
      if (draftTiles[i]) {
        if (draftTiles[i]?.includes(j)) {
          draftTiles[i] = draftTiles[i].filter((x: number) => x !== j);
          if (!draftTiles[i].length) {
            delete draftTiles[i];
          }
        } else {
          draftTiles[i].push(j);
        }
      } else {
        draftTiles[i] = [j];
      }
      setSelectedTiles(draftTiles);
    }
  };

  const winingRows = useMemo(() => getWinners(selectedTiles), [selectedTiles]);

  const winningColumns = useMemo(
    () => getWinners(formatRowsToColumns(selectedTiles)),
    [selectedTiles]
  );

  const winingDiagonals = useMemo(
    () => getWinners(getDiagonals(selectedTiles)),
    [selectedTiles]
  );

  const BingoLines = useMemo(
    () => [...winingDiagonals, ...winningColumns, ...winingRows].length,
    [winingDiagonals, winningColumns, winingRows]
  );

  const prevBingo = usePrevious(BingoLines);

  const newBingo = useMemo(
    () => BingoLines > (prevBingo || 0),
    [BingoLines, prevBingo]
  );

  const isTileSelected = (i: number, j: number) =>
    selectedTiles[i]?.includes(j);
  
  return (
    <div className="container">
      <Score score={BingoLines} />
      {newBingo && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {cards.map((row, i) => (
        <div className="row" key={`row${i}`}>
          {row.map((tile, j) => (
            <Tile
              key={`${i}*${j}`}
              isMiddle={i === j && i === middleMatrix}
              value={tile}
              toggleTile={() => handleTile(i, j)}
              isSelected={isTileSelected(i, j)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Card;
