import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Menu from "../../../src/Layouts/Menu/Menu";

describe("Menu", () => {
  it("should render menu with all expected elements", () => {
    render(
      <MemoryRouter initialEntries={["/rates"]}>
        <Menu />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("OFX");
    expect(logo).not.toBeNull();

    const ratesLink = screen.getByRole("link", { name: /rates/i });
    expect(ratesLink).not.toBeNull();
    expect(ratesLink.getAttribute("href")).toBe("/rates");

    const transferIcon = screen.getByTestId("transfer-icon");
    expect(transferIcon).not.toBeNull();

    const menuContainer =
      screen.getByRole("navigation", { hidden: true }) ||
      screen.getByText((_, node) => {
        return node?.parentElement?.className?.includes("menu") || false;
      });
    expect(menuContainer).toBeTruthy();
  });
});
