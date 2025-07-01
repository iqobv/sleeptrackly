import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createChangelog, updateChangelog } from "../../api/changelogs";

import { changelogFields } from "../../constants/changelogFields";

import EditorField from "./EditorField/EditorField";

import styles from "./ChangelogEditor.module.scss";

const ChangelogEditor = ({ isEdit = false, data }) => {
  const methods = useForm();
  const navigate = useNavigate();

  const {
    mutate: create,
    isLoading: isLoadingCreate,
    isError: isCreateError,
    data: createdChangelog,
  } = useMutation({
    mutationFn: (data) => createChangelog(data),
    mutationKey: ["create-changelog"],
  });

  const {
    mutate: update,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    data: updatedChangelog,
  } = useMutation({
    mutationFn: ({ id, data }) => updateChangelog(id, data),
    mutationKey: ["update-changelog"],
    onSuccess: () => toast.success("Changelog updated successfully"),
    onError: () => toast.error("Failed to update changelog"),
  });

  useEffect(() => {
    if (isEdit && data) {
      const merged = { ...data, ...data.content };
      methods.reset(merged);
    }
  }, [isEdit, data]);

  const onSubmit = async (data) => {
    isEdit ? update({ id: data._id, data }) : create(data);
  };

  useEffect(() => {
    if (!isLoadingCreate && !isCreateError && createdChangelog) {
      navigate(`/changelogs/${createdChangelog.ver}`);
    }
  }, [isLoadingCreate, isCreateError, createdChangelog]);

  return (
    <div className={styles["changelog-editor"]}>
      <FormProvider {...methods}>
        <form
          action=''
          onSubmit={methods.handleSubmit(onSubmit)}
          className={styles["changelog-editor-form"]}>
          {changelogFields.map((field) => (
            <EditorField key={field.name} field={field} />
          ))}
          <button type='submit' className={styles["submit-button"]}>
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChangelogEditor;
