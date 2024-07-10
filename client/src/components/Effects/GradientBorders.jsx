"use client";
import React, { useRef, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "../../lib/utils";


// Button Gradient Border
export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden md:col-span-2 md:row-span-1",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0 rounde-[1.75rem]"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(#CBACF9_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

// Card Gradient Border
export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    if (pathRef.current && pathRef.current.getTotalLength) {
      const length = pathRef.current.getTotalLength();
      if (length) {
        const pxPerMillisecond = length / duration;
        const animate = (time) => {
          const newProgress = (time * pxPerMillisecond) % length;
          if (isNaN(newProgress)) {
            console.error("NaN value detected in animation progress");
          }
          progress.set(newProgress);
          requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }
  }, [duration, progress]);

  const x = useTransform(progress, (val) => {
    const xValue = pathRef.current?.getPointAtLength(val).x || 0;
    if (isNaN(xValue)) {
      console.error("NaN value detected in x transform");
    }
    return xValue;
  });
  const y = useTransform(progress, (val) => {
    const yValue = pathRef.current?.getPointAtLength(val).y || 0;
    if (isNaN(yValue)) {
      console.error("NaN value detected in y transform");
    }
    return yValue;
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <path fill="none" d="M0 0h100v100h-100z" ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
