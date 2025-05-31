import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        variant='outlined'
        content='Edit'
        isLink
        redirect={`/challenges/edit/${challengeId}`}
      />
      <Button content='Delete' onClick={handleOpen} color='error' />
      <Modal ref={modalRef} isOpen={isOpen} onClose={handleClose}>
        <h2>Are you sure you want to delete this challenge?</h2>
        <div className={styles["modal-buttons"]}>
          <Button content='Yes' onClick={handleDelete} color='error' />
          <Button content='No' onClick={handleCloseModal} />
        </div>
      </Modal>
    </div>
  );
};

export default ChallengeControl;
