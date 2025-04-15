import { describe, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAnimationFrame } from "../../src/Hooks/useAnimationFrame";

describe("useAnimationFrame", () => {
  let requestAnimationFrameSpy: ReturnType<typeof vi.fn>;
  let cancelAnimationFrameSpy: ReturnType<typeof vi.fn>;
  let callback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    requestAnimationFrameSpy = vi.fn();
    cancelAnimationFrameSpy = vi.fn();
    vi.stubGlobal("requestAnimationFrame", requestAnimationFrameSpy);
    vi.stubGlobal("cancelAnimationFrame", cancelAnimationFrameSpy);
    callback = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("should not start animation frame when run is false", () => {
    renderHook(() => useAnimationFrame(false, callback));
    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
  });

  it("should continually run animation while run is true", () => {
    let rafCallback: ((time: number) => void) | undefined;
    let frame = 0;

    // Override the spy implementation to capture the callback
    requestAnimationFrameSpy.mockImplementation((cb: (time: number) => void) => {
      rafCallback = cb;
      // Simulate a frame id
      return ++frame;
    });

    renderHook(() => useAnimationFrame(true, callback));

    // Simulate first animation frame
    act(() => {
      rafCallback && rafCallback(100);
    });
    // Simulate second animation frame
    act(() => {
      rafCallback && rafCallback(116);
    });
    // Simulate third animation frame
    act(() => {
      rafCallback && rafCallback(132);
    });

    // The callback should not be called on the very first frame (no previous time)
    // But should be called on subsequent frames with correct delta
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, 16); // 116 - 100
    expect(callback).toHaveBeenNthCalledWith(2, 16); // 132 - 116
  });
});
