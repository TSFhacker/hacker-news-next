import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "@/app/page";

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
  render(await Page());
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe("Main page", () => {
  it("renders a correct main header", () => {
    const header: HTMLElement = screen.getByRole("heading", { level: 1 });
    expect(header).toHaveTextContent("Top 100 Hacker News");
  });

  it("renders a stories list", () => {
    const header: HTMLElement = screen.getByRole("heading", { level: 1 });

    expect(header).toHaveTextContent("Top 100 Hacker News");
  });
});
