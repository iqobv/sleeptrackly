import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { updateTask } from "../../../api/challenges";

import { taskSummaryItems } from "./taskSummaryList";

import Button from "../../Button/Button";

import styles from "./TaskSummary.module.scss";

const TaskSummary = ({ selectedDate, challenge, type = "daily" }) => {
  const [info, setInfo] = useState("");
  const queryClient = useQueryClient();
  const [canUpdate, setCanUpdate] = useState(false);

  const {
    mutate: markAsCompleted,
    data,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ challengeId, taskId, data }) =>
      updateTask(challengeId, taskId, data),
    mutationKey: ["mark-as-completed"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["challenge", challenge?._id],
      });
    },
  });

  useEffect(() => {
    if (selectedDate?.isCompleted) {
      setCanUpdate(false);
      return;
    }

    if (!challenge?.isStarted) {
      setCanUpdate(false);
      return;
    }

    const nowDate = dayjs().toDate();
    const startDate = dayjs(selectedDate.startDate).toDate();

    nowDate.getTime() > startDate.getTime()
      ? setCanUpdate(true)
      : setCanUpdate(false);
  }, [selectedDate, challenge]);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      toast.success("Task marked as completed");
    } else if (isError) {
      toast.error(error.message);
    }
  }, [data, isLoading, isError, error]);

  const handleMarkAsCompleted = () => {
    if (selectedDate?.isCompleted) return null;
    if (!challenge?.isStarted) return null;
    if (!canUpdate) return null;

    markAsCompleted({
      challengeId: challenge?._id,
      taskId: selectedDate?._id,
      data: { isCompleted: true },
    });
  };

  const formatDate = (date) => dayjs(date).format("DD.MM.YYYY");

  useEffect(() => {
    const startDate = dayjs(selectedDate.startDate);
    const endDate = dayjs(selectedDate.endDate);
    let str = `${formatDate(startDate)}`;

    if (!endDate.isSame(startDate, "day")) {
      str += ` - ${formatDate(endDate)}`;
    }

    setInfo(str);
  }, [selectedDate]);

  return (
    <div className={styles["task-summary"]}>
      <div className={styles["task-summary-item"]}>
        <p className={styles["task-summary-item-name"]}>Info about task:</p>
        <p className={styles["task-summary-item-value"]}>{info}</p>
      </div>
      {taskSummaryItems(selectedDate).map((item) => (
        <div key={item.name} className={styles["task-summary-item"]}>
          <p className={styles["task-summary-item-name"]}>{item.label}:</p>
          <p className={styles["task-summary-item-value"]}>{item.value}</p>
        </div>
      ))}
      <div>
        <Button onClick={handleMarkAsCompleted} disabled={!canUpdate}>
          Mark as completed
        </Button>
      </div>
    </div>
  );
};

export default TaskSummary;
