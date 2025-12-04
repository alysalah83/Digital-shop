"use client";

import {
  createContext,
  ReactNode,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ICONS_MAP } from "@/consts/iconsMap";
import { createPortal } from "react-dom";

interface ModalContextValue {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

type ContentPosition = "middle" | "right";

const ModalContext = createContext<ModalContextValue | null>(null);

export function Modal({
  children,
  initialIsOpen = false,
}: {
  children: ReactNode;
  initialIsOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const values = useMemo(
    () => ({
      isOpen,
      handleClose,
      handleOpen,
    }),
    [isOpen, handleClose, handleOpen],
  );
  return <ModalContext value={values}>{children}</ModalContext>;
}

export function useModal() {
  const values = use(ModalContext);
  if (!values)
    throw new Error("Modal context is being used outside of its scope");
  return values;
}

export function ModalTrigger({
  children,
  classes,
}: {
  children: ReactNode;
  classes?: string;
}) {
  const { handleOpen } = useModal();

  return (
    <div onClick={handleOpen} className={classes}>
      {children}
    </div>
  );
}

function OverLay({ children }: { children: React.ReactNode }) {
  const { handleClose } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return createPortal(
    <div
      className="fixed inset-0 z-40 cursor-pointer bg-blue-950/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") handleClose();
      }}
    >
      {children}
    </div>,
    document.body,
  );
}

export function ModalContent({
  children,
  contentPosition = "middle",
  closeBtnColor = "text-blue-950",
}: {
  children: React.ReactNode;
  contentPosition?: ContentPosition;
  closeBtnColor?: `text-${string}-${number}`;
}) {
  const { isOpen, handleClose } = useModal();

  if (!isOpen) return;

  return (
    <OverLay>
      <div
        className={`fixed z-50 cursor-default ${
          contentPosition === "middle"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : "top-1/2 right-0 -translate-y-1/2"
        }`}
      >
        <button
          type="button"
          aria-label="close modal button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 cursor-pointer"
        >
          <ICONS_MAP.close
            className={`h-7 w-7 ${closeBtnColor} transition duration-200 hover:rotate-180 active:rotate-180`}
          />
        </button>

        {children}
      </div>
    </OverLay>
  );
}
