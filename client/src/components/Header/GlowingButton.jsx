import { useEffect, useRef, forwardRef } from "react";
import PropTypes from "prop-types";

const GlowingButton = forwardRef(function GlowingButton(
  { className, onClick, selectedPath, children },
  ref
) {
  const localRef = useRef(null);

  useEffect(() => {
    const rects = localRef?.current?.querySelectorAll("rect");
    const rx = getComputedStyle(localRef?.current).borderRadius;
    const containerOffset = parseInt(
      getComputedStyle(localRef.current).getPropertyValue("--container-offset")
    );
    rects?.forEach((rect) => {
      rect.setAttribute("rx", rx);
      rect.setAttribute("x", `${containerOffset / 2}`);
      rect.setAttribute("y", `${containerOffset / 2}`);
    });
  }, [localRef]);

  return (
    <button
      onClick={onClick}
      ref={assignRefs(localRef, ref)}
      tabIndex={0}
      data-glow-animation={selectedPath}
      data-selected={selectedPath}
      className={`button glow-effect text-sm z-50 ${className}`}
    >
      {children}
      <svg tabIndex={-1} className="glow-container">
        <rect
          tabIndex={-1}
          pathLength="100"
          x={50}
          rx={16}
          strokeLinecap="round"
          className="glow-line"
        ></rect>
        <rect
          tabIndex={-1}
          x={50}
          rx={16}
          pathLength="100"
          strokeLinecap="round"
          className="glow-blur"
        ></rect>
      </svg>
    </button>
  );
});

// ref can be a function or a mutable ref object, so we need to check for both.
const assignRefs = (...refs) => {
  return (node) => {
    refs.forEach((r) => {
      if (typeof r === "function") {
        r(node);
      } else if (r) {
        r.current = node;
      }
    });
  };
};

GlowingButton.displayName = "GlowingButton";

GlowingButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  selectedPath: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default GlowingButton;
