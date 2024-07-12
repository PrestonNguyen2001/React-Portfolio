import "@testing-library/jest-dom/extend-expect";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Mock TextEncoder and TextDecoder
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock canvas
const createElement = global.document.createElement;

global.document.createElement = (tagName) => {
  if (tagName === "canvas") {
    return {
      getContext: () => ({
        fillRect: () => {},
        clearRect: () => {},
        getImageData: (x, y, w, h) => ({
          data: new Array(w * h * 4),
        }),
        putImageData: () => {},
        createImageData: () => [],
        setTransform: () => {},
        drawImage: () => {},
        save: () => {},
        fillText: () => {},
        restore: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        stroke: () => {},
        translate: () => {},
        scale: () => {},
        rotate: () => {},
        arc: () => {},
        fill: () => {},
        measureText: () => ({ width: 0 }),
        transform: () => {},
        rect: () => {},
        clip: () => {},
      }),
    };
  }
  return createElement.call(global.document, tagName);
};

// Mock document appendChild
global.document.appendChild = (child) => {
  if (child.tagName === "CANVAS") {
    return {
      getContext: () => ({
        fillRect: () => {},
        clearRect: () => {},
        getImageData: (x, y, w, h) => ({
          data: new Array(w * h * 4),
        }),
        putImageData: () => {},
        createImageData: () => [],
        setTransform: () => {},
        drawImage: () => {},
        save: () => {},
        fillText: () => {},
        restore: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        stroke: () => {},
        translate: () => {},
        scale: () => {},
        rotate: () => {},
        arc: () => {},
        fill: () => {},
        measureText: () => ({ width: 0 }),
        transform: () => {},
        rect: () => {},
        clip: () => {},
      }),
    };
  }
  return child;
};
