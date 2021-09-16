import React from "react";
import { act, render } from "@testing-library/react";
import App from "./App";
import { unmountComponentAtNode } from "react-dom";
import { Sidebar } from "./Sidebar";
import pretty from "pretty";

let container: any = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// ROUTER
test("/ redirects to /home", () => {
  act(() => {
    render(<App />, container);
  });
  expect(window.location.pathname).toEqual("/home");
});

test("sidebar renders", () => {
  act(() => {
    render(<Sidebar />, container);
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
});

test("sidebar links work", () => {})

// HOMEPAGE
test("create a new tweet", () => {})
test("tweets render on homepage", () => {})

// PROFILE PAGE
test("currentUser profile page renders", () => {})
test("filters for profile page tweets work correctly", () => {})

// NOTIFICATIONS
test("mentions filter works", () => {})

// BOOKMARKS
test("bookmarks page renders with bookmarks", () => {})
test("bookmarks added", () => {})

// LISTS
test("lists rendered", () => {})
test("lists added", () => {})

// MESSAGES
test("messages renders", () => {})
test("message sent", () => {})
test("messages searchbar works", () => {})

// TWEETS
test("like button works", () => {})
test("retweet btn works", () => {})
test("comments button works", () => {})