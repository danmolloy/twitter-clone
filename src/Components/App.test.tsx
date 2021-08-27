import React from "react";
import { act, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
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