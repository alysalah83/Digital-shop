"use client";

import { isPositive } from "@/features/product/utils/helper";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

function MoveUpButton() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(function () {
    if (!buttonRef.current) return;
    const thresholdElement = document.querySelector('[data-threshold="true"]');
    if (!thresholdElement) return;

    const options = {
      threshold: 0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting || !isPositive(entry.boundingClientRect.y)
        ? setIsVisible(true)
        : setIsVisible(false);
    }, options);

    observer.observe(thresholdElement);

    return () => observer.disconnect();
  }, []);

  const handleScrollUp = function () {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  return (
    <button
      className={`cursor-pointer rounded-md ${isVisible ? "block" : "hidden"} bg-blue-700 p-1 hover:bg-blue-800`}
      onClick={handleScrollUp}
      ref={buttonRef}
      aria-label="Scroll to Up Button"
    >
      <MdKeyboardArrowUp className="h-7 w-7 fill-slate-100 lg:h-9 lg:w-9" />
    </button>
  );
}

function MoveDownButton() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(function () {
    if (!buttonRef.current) return;
    const thresholdElement = document.querySelector("footer");
    if (!thresholdElement) return;

    const options = {
      threshold: 0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      !entry.isIntersecting ? setIsVisible(true) : setIsVisible(false);
    }, options);

    observer.observe(thresholdElement);

    return () => observer.disconnect();
  }, []);

  const handleScrollDown = function () {
    window.scrollTo({
      behavior: "smooth",
      top: document.body.scrollHeight,
    });
  };

  return (
    <button
      className={`cursor-pointer rounded-md ${isVisible ? "block" : "hidden"} bg-blue-700 p-1 hover:bg-blue-800`}
      onClick={handleScrollDown}
      ref={buttonRef}
      aria-label="Scroll to Down Button"
    >
      <MdKeyboardArrowDown className="h-7 w-7 fill-slate-100 lg:h-9 lg:w-9" />
    </button>
  );
}

function WindowScrollBtns() {
  return (
    <div className="fixed right-4 bottom-4 z-[999] inline-flex w-fit flex-col gap-y-2.5">
      <MoveUpButton />
      <MoveDownButton />
    </div>
  );
}

export default WindowScrollBtns;
