import { screen, render } from "@testing-library/react";
import React from "react";
import Tile from ".";
describe("Tile", () => {
  test("Tile component should be rendred and selected", () => {
    render(
      <Tile
        value="Hello"
        toggleTile={() => {}}
        isSelected={true}
        isMiddle={false}
      />
    );
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello/i).getAttribute("class")).toBe(
      "tile isTileSelected"
    );
  });

  test("Middle Tile component should be rendred", () => {
    render(
      <Tile
        value="Hello"
        toggleTile={() => {}}
        isSelected={true}
        isMiddle={true}
      />
    );
    expect(screen.getByText(/Hello/i).getAttribute("class")).toBe(
      "tile isMiddle"
    );
  });
});
