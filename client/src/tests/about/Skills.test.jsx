import React from "react";
import { render } from "@testing-library/react";
import Skills from "../../components/About/Skills";
import skills from "../../data/skillsData";
import { Button } from "../../components/Effects/MovingBorders";

jest.mock("../../data/skillsData", () => [
  {
    id: "1",
    title: "Skill 1",
    desc: [
      { icon: "icon1.png", name: "Subskill 1" },
      { icon: "icon2.png", name: "Subskill 2" },
    ],
  },
]);

jest.mock("../../components/Effects/MovingBorders.jsx", () => ({
  Button: ({ children }) => <div>{children}</div>,
}));

describe("Skills Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Skills />);
    expect(getByText("Skill 1")).toBeInTheDocument();
    expect(getByText("Subskill 1")).toBeInTheDocument();
    expect(getByText("Subskill 2")).toBeInTheDocument();
  });
});
