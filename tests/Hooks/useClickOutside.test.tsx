import { describe, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useClickOutside } from "../../src/Hooks/useClickOutside";

describe("useClickOutside", () => {
  let ref: { current: HTMLElement | null };
  let callback: ReturnType<typeof vi.fn>;
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
    ref = { current: element };
    callback = vi.fn();
  });

  afterEach(() => {
    document.body.removeChild(element);
    vi.clearAllMocks();
  });

  it("should not error out if the ref is equal to null", () => {
    const ref = { current: null };
    const callback = vi.fn();

    renderHook(() => useClickOutside(ref, callback));

    const event = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, "target", { value: document.body });

    expect(() => {
      document.dispatchEvent(event);
    }).not.toThrow();

    expect(callback).not.toHaveBeenCalled();
  });

  it("should trigger callback on click outside", () => {
    renderHook(() => useClickOutside(ref, callback));

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    const event = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, "target", { value: outsideElement });

    document.dispatchEvent(event);

    expect(callback).toHaveBeenCalledWith(event);

    document.body.removeChild(outsideElement);
  });

  it("should not trigger callback when clicking inside the ref element", () => {
    renderHook(() => useClickOutside(ref, callback));

    const event = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, "target", { value: element });

    document.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });
});
