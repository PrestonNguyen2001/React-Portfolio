import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const SimpleComponent = () => <div>Hello, world!</div>;

describe("SimpleComponent", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<SimpleComponent />);
    expect(getByText("Hello, world!")).toBeInTheDocument();
  });
});
