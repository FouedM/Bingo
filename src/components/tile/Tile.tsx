import classNames from "classnames";
import "./Tile.css";

const Tile = ({
  value,
  toggleTile,
  isSelected,
  isMiddle,
}: {
  value: string;
  toggleTile: () => void;
  isSelected: boolean;
  isMiddle: boolean;
}) => (
  <div
    onClick={toggleTile}
    className={classNames("tile", {
      isTileSelected: !isMiddle && isSelected,
      isMiddle: isMiddle,
    })}
  >
    {value}
  </div>
);

export default Tile;
