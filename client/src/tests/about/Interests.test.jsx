import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Interests from "../../components/About/Interests";

jest.mock("../../data/index", () => ({
  gridItems: [
    {
      id: "1",
      title: "Interest 1",
      description: "Description 1",
      className: "className1",
      img: "img1.png",
      imgClassName: "imgClassName1",
      titleClassName: "titleClassName1",
      spareImg: "spareImg1.png",
      component: "Component1",
    },
  ],
}));

describe("Interests Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Interests />);
    expect(getByText("Interest 1")).toBeInTheDocument();
  });
});
