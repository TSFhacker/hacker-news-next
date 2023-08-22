import React from "react";
import {
  screen,
  render,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "@/app/page";
import Card from "@/components/Card";

// This is the function we'll be testing
async function withFetch() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await res.json();

  return json;
}

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

beforeAll(async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(new Array(100).fill(1)),
    })
  ) as jest.Mock;
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe("Main page", () => {
  it("renders a correct main header", async () => {
    render(await Page());
    const header: HTMLElement = screen.getByRole("heading", { level: 1 });
    expect(header).toHaveTextContent("Top 100 Hacker News");
  });

  it("renders 20 stories first", async () => {
    render(await Page());
    const header: HTMLElement[] = screen.getAllByRole("heading", { level: 2 });
    expect(header.length).toBe(20);
  });

  it("renders a story card properly", async () => {
    const { getByTestId } = render(
      await Card({
        story: {
          by: "string",
          descendants: 3,
          id: 2,
          kids: [1, 2, 3],
          score: 23,
          time: 23,
          title: "string",
          type: "string",
          url: "link to a new page",
        },
        i: 5,
      })
    );
    expect(getByTestId("story")).toBeInTheDocument();
    expect(getByTestId("story-title")).toBeInTheDocument();
    expect(getByTestId("author")).toBeInTheDocument();
    expect(getByTestId("author-name")).toBeInTheDocument();
    expect(getByTestId("score")).toBeInTheDocument();
    expect(getByTestId("story")).toHaveAttribute("href", "link to a new page");
  });
});
