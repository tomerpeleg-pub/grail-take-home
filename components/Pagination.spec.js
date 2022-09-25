import { render, screen, fireEvent } from "@testing-library/react";

import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("disables the previous button if the user is on the first page", () => {
    const prevMock = jest.fn();
    const nextMock = jest.fn();

    render(
      <Pagination
        onPrevClicked={prevMock}
        onNextClicked={nextMock}
        page={0}
        totalPages={5}
        totalResults={50}
        limit={10}
      />
    );

    expect(screen.getByText("Prev")).toHaveAttribute("disabled");
    expect(screen.getByText("Next")).not.toHaveAttribute("disabled");
  });

  it("disables the next button if the user is on the last page", () => {
    const prevMock = jest.fn();
    const nextMock = jest.fn();

    render(
      <Pagination
        onPrevClicked={prevMock}
        onNextClicked={nextMock}
        page={5}
        totalPages={5}
        totalResults={50}
        limit={10}
      />
    );

    expect(screen.getByText("Prev")).not.toHaveAttribute("disabled");
    expect(screen.getByText("Next")).toHaveAttribute("disabled");
  });

  it("calls the given prev/next page handlers when a button is clicked", () => {
    const prevMock = jest.fn();
    const nextMock = jest.fn();

    render(
      <Pagination
        onPrevClicked={prevMock}
        onNextClicked={nextMock}
        page={2}
        totalPages={5}
        totalResults={50}
        limit={10}
      />
    );

    fireEvent.click(screen.getByText("Prev"));
    expect(prevMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Next"));
    expect(prevMock).toHaveBeenCalled();
  });

  it("shows the current and total pages", () => {
    const prevMock = jest.fn();
    const nextMock = jest.fn();

    render(
      <Pagination
        onPrevClicked={prevMock}
        onNextClicked={nextMock}
        page={5}
        totalPages={5}
        totalResults={50}
        limit={10}
      />
    );

    expect(
      screen.getByText("Showing 10 out of 50", { exact: false })
    ).toBeInTheDocument();
  });
});
