
export function getOffset(e) {
    const event = e.touches ? e.touches[0] : e;
    return {
        x: event.clientX,
        y: event.clientY,
        pageX: event.pageX,
        pageY: event.pageY,
    };
  }

export const clamp = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
