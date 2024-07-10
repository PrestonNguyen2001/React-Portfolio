import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils.js";

export const MovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "10s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "30s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "75s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[60vw] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-800 p-6 md:p-12 md:w-[40vw]"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
            key={idx}
          >
            <Link to={item.link}>
              <blockquote className="p-4 bg-gray-900 bg-opacity-80 rounded-md shadow-lg">
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <div className="relative flex items-center justify-center overflow-hidden h-[20vh] lg:h-[30vh] mb-6 rounded-t-md">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative w-full h-full object-cover rounded-t-md"
                    />
                  )}
                </div>
                <span
                  className="relative z-20 text-sm md:text-lg leading-[1.6] text-white font-normal"
                  dangerouslySetInnerHTML={{ __html: item.quote }}
                ></span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <div className="me-3">
                    <img
                      src="/profile.png"
                      alt="profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <span className="flex flex-col gap-1">
                    <span className="text-2xl font-extrabold leading-[1.6] text-purple-400">
                      {item.name}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
