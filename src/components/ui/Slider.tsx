/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  Children,
  cloneElement,
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface SliderContextValues {
  slideActive: number;
  isDragging: boolean;
  setSlideActive: React.Dispatch<React.SetStateAction<number>>;
  sliderRef: React.RefObject<HTMLDivElement | null>;
  moveForward: () => void;
  moveBackward: () => void;
  moveForwardAuto: () => void;
  handleDragStart: (event: React.MouseEvent | React.TouchEvent) => void;
  handleDragMove: (event: React.MouseEvent | React.TouchEvent) => void;
  handleDragEnd: (event: React.MouseEvent | React.TouchEvent) => void;
  count: number;
  dragOffset: number;
}

const SLIDER_TRASHLOAD_PERCENTAGE = 0.3;
const SLIDER_AUTO_ROTATE_TIME = 5000;
const isPositive = (num: number) => num > 0;

const SliderContext = createContext<SliderContextValues | null>(null);

function useSliderContext() {
  const context = use(SliderContext);
  if (!context) {
    throw new Error("Slider components must be used within a Slider component");
  }
  return context;
}

function Slider({
  children,
  count,
}: {
  children: React.ReactNode;
  count: number;
}) {
  const [slideActive, setSlideActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);

  const moveForward = useCallback(
    () => setSlideActive((cur) => (cur !== count - 1 ? cur + 1 : cur)),
    [count]
  );

  const moveBackward = useCallback(
    () => setSlideActive((cur) => (cur !== 0 ? cur - 1 : cur)),
    []
  );

  const moveForwardAuto = useCallback(
    () => setSlideActive((cur) => (cur !== count - 1 ? cur + 1 : 0)),
    [count]
  );

  const resetDragging = useCallback(() => {
    setDragOffset(0);
    setIsDragging(false);
  }, []);

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      dragStartX.current =
        (e as React.TouchEvent).touches?.[0].clientX ||
        (e as React.MouseEvent).clientX;
    },
    []
  );

  const handleDragMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;

      const currentX =
        (e as React.TouchEvent).touches?.[0].clientX ||
        (e as React.MouseEvent).clientX;
      const movedDistance = dragStartX.current - currentX;

      setDragOffset(movedDistance);
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;

      const end =
        (e as React.TouchEvent).changedTouches?.[0].clientX ||
        (e as React.MouseEvent).clientX;
      const movedDistance = dragStartX.current - end;

      if (sliderRef.current) {
        const threshold =
          sliderRef.current.offsetWidth * SLIDER_TRASHLOAD_PERCENTAGE;

        if (Math.abs(movedDistance) > threshold)
          isPositive(movedDistance) ? moveForward() : moveBackward();

        resetDragging();
      }
    },
    [isDragging, moveForward, moveBackward, resetDragging]
  );

  const values = useMemo(
    () => ({
      slideActive,
      setSlideActive,
      isDragging,
      sliderRef,
      moveForward,
      moveBackward,
      moveForwardAuto,
      handleDragStart,
      handleDragMove,
      handleDragEnd,
      count,
      dragOffset,
    }),
    [
      slideActive,
      isDragging,
      moveForward,
      moveBackward,
      moveForwardAuto,
      handleDragStart,
      handleDragMove,
      handleDragEnd,
      count,
      dragOffset,
    ]
  );
  return <SliderContext value={values}>{children}</SliderContext>;
}

function SliderCards({ children }: { children: React.ReactNode }) {
  const {
    sliderRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isDragging,
    slideActive,
    dragOffset,
  } = useSliderContext();

  return (
    <div
      className={`flex ${isDragging ? "" : "transition duration-500"}`}
      style={{
        transform: `translateX(calc(${
          -slideActive * 100
        }% + ${-dragOffset}px))`,
      }}
      ref={sliderRef}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {children}
    </div>
  );
}

function SliderNavBtns({
  children,
  activeClassName = "w-10 bg-blue-700",
  inactiveClassName = "w-6 bg-slate-300",
}: {
  children?: React.ReactElement;
  activeClassName?: string;
  inactiveClassName?: string;
}) {
  const { isDragging, moveForwardAuto, slideActive, setSlideActive, count } =
    useSliderContext();

  useEffect(() => {
    const id = setInterval(() => {
      if (!isDragging || slideActive) moveForwardAuto();
    }, SLIDER_AUTO_ROTATE_TIME);

    return () => clearInterval(id);
  }, [isDragging, slideActive, moveForwardAuto]);

  return Array.from({ length: count }).map((_, i) =>
    React.isValidElement(children)
      ? cloneElement(children as React.ReactElement<any>, {
          onClick: () => setSlideActive(i),
          key: i,
          className: `${
            slideActive === i ? activeClassName : inactiveClassName
          } ${(children as any).props?.className || ""}`,
        })
      : null
  );
}

function SliderArrowBtns({ children }: { children: React.ReactNode }) {
  const { slideActive, count, moveForward, moveBackward } = useSliderContext();

  const childrenArray = Children.toArray(children);

  const PrevButton =
    childrenArray[0] && React.isValidElement(childrenArray[0])
      ? cloneElement(childrenArray[0] as React.ReactElement<any>, {
          ...(childrenArray[0] as React.ReactElement<any>).props,
          onClick: moveBackward,
          disabled: slideActive === 0,
        })
      : null;

  const NextButton =
    childrenArray[1] && React.isValidElement(childrenArray[1])
      ? cloneElement(childrenArray[1] as React.ReactElement<any>, {
          ...(childrenArray[1] as React.ReactElement<any>).props,
          onClick: moveForward,
          disabled: slideActive === count - 1,
        })
      : null;

  return (
    <>
      {PrevButton}
      {NextButton}
    </>
  );
}

export { Slider, SliderCards, SliderNavBtns, SliderArrowBtns };
