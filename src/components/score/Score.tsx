import classNames from "classnames";
import "./Score.css";

const Score = ({ score }: { score: number }) => {
  const BINGO = ["B", "I", "N", "G", "O"];
  for (let i = 0; i < score; i++) {}

  return (
    <div className="score">
      {BINGO.map((car, index) => (
        <span
          className={classNames(
            "car",
            { active: index < score },
            { inactive: index >= score },
            { bordered: index <= score }
          )}
          key={car}
        >
          {car}
        </span>
      ))}
    </div>
  );
};

export default Score;
