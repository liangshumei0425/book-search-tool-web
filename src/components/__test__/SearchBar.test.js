import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders correctly", () => {
    const { queryByTestId, queryByPlaceholderText } = render(<SearchBar />);

    expect(queryByTestId("search-button")).toBeTruthy();
    expect(queryByPlaceholderText("Search for Books")).toBeTruthy();
  });

  describe("Input value", () => {
    it("updates on change", () => {
      const { queryByPlaceholderText } = render(<SearchBar />);

      const searchInput = queryByPlaceholderText("Search for Books");

      fireEvent.change(searchInput, { target: { value: "Harry Potter" } });

      expect(searchInput.value).toBe("Harry Potter");
    });
  });

  describe("Search Button", () => {});
});
