import React from "react";
import { render } from "@testing-library/react";
import Summary from "../../components/About/Summary";

jest.mock("../../assets/images/ProfileImage.png", () => "test-file-stub");

describe("Summary Component", () => {
  it("renders without crashing", () => {
    const { getByText, getByAltText } = render(<Summary />);
    expect(getByText("Meet Preston Nguyen")).toBeInTheDocument();
    expect(
      getByText(
        "Hi, I'm Preston, a coding bootcamp student with a passion for technology and creativity. My journey in tech began with a curiosity for how things work and a desire to create solutions that make a difference."
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        "Outside of coding, I love exploring new hobbies and activities that keep me inspired and motivated. Whether it's experimenting with new recipes, hiking trails, or diving into a good book, I believe in maintaining a balanced lifestyle."
      )
    ).toBeInTheDocument();
    expect(getByAltText("about banner")).toHaveAttribute(
      "src",
      "test-file-stub"
    );
    expect(getByText("Preston Nguyen")).toBeInTheDocument();
    expect(getByText("(703) -973-8176")).toBeInTheDocument();
    expect(getByText("prestonnguyen2001@gmail.com")).toBeInTheDocument();
  });
});
