import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteChallenge as apiDeleteChallenge } from "../../api/challenges";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import styles from "./ChallengeControl.module.scss";

const ChallengeControl = ({ challengeId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);

  const navigate = useNavigate();

  const { mutate: deleteChallenge } = useMutation({
    mutationFn: (id) => apiDeleteChallenge(id),
    mutationKey: ["delete-challenge"],
    onSuccess: () => {
      handleClose();
      handleCloseModal();
      navigate("/challenges");
      toast.success("Challenge deleted successfully");
    },
    onError: (error) =>
      toast.error(error.message || "Failed to delete challenge"),
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleCloseModal = () => {
    if (modalRef.current) modalRef.current.closeModal();
  };

  const handleDelete = () => deleteChallenge(challengeId);

  return (
    <div className={`section ${styles["challenge-control-container"]}`}>
      <Button
        variant="outlined"
        isLink
        redirect={`/challenges/edit/${challengeId}`}
      >
        Edit
      </Button>
      <Button onClick={handleOpen} color="error">
        Delete
      </Button>
      <Modal ref={modalRef} isOpen={isOpen} onClose={handleClose}>
        <h2>Are you sure you want to delete this challenge?</h2>
        <div className={styles["modal-buttons"]}>
          <Button onClick={handleDelete} color="error">
            Yes
          </Button>
          <Button onClick={handleCloseModal}>No</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ChallengeControl;
