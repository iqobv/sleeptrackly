import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { MdClose } from "react-icons/md";

import Button from "../Button/Button";

import styles from "./Modal.module.scss";

const ANIMATION_DURATION = 200;

const Modal = ({ children, isOpen, onClose, ref }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => setIsClosing(true);

  const handleCloseByOverlay = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, ANIMATION_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [isClosing]);

  useEffect(() => {
    if (ref) {
      ref.current = {
        closeModal: handleClose,
      };
    }
  }, [ref]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`${styles["modal-overlay"]} ${isOpen ? styles["open"] : ""} ${
        isClosing ? styles["closing"] : ""
      }`}
      style={{
        "--animation-duration": `${ANIMATION_DURATION}ms`,
      }}
      onClick={handleCloseByOverlay}
    >
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <Button onClick={handleClose} variant="text" isIcon>
            <MdClose />
          </Button>
        </div>
        <div className={styles["modal-content"]}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
