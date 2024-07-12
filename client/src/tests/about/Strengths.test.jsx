import React from "react";
import { render } from "@testing-library/react";
import Strengths from "../../components/About/Strengths";
import strengthsData from "../../data/strengthsData";

jest.mock("../../data/strengthsData", () => [
  {
    id: "1",
    title: "Strength 1",
    description: "Description 1",
    thumbnail: "thumbnail1.png",
  },
]);

jest.mock("../../components/Effects/MovingBorders.jsx", () => ({
  Button: ({ children }) => <div>{children}</div>,
}));

describe("Strengths Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Strengths />);
    expect(getByText("Strength 1")).toBeInTheDocument();
    expect(getByText("Description 1")).toBeInTheDocument();
  });
});
