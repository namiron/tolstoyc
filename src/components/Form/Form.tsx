import React from "react";
import { useForm } from "react-hook-form";
import {
  INPUT_FIRST,
  INPUT_SECOND,
  INPUT_THIRD,
  SUBMIT,
  MY_WORK,
  URL_ERRORS,
} from "../common/constant";
import { IUrls } from "../../redux/types/IUrlsProps";
import { useAppDispatch } from "../../hooks/hooks";
import { sendUrls } from "../../redux/API/urls/sendUrls";
import styles from "./style/form.module.scss";

const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*$/;

const Form: React.FC = () => {
  //----------------------------------------
  const [formError, setFormError] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IUrls>({ mode: "onBlur" });

  const handleUrls = async (data: IUrls) => {
    try {
      await dispatch(sendUrls(data)).unwrap();
      reset();
    } catch (error) {
      setFormError(error as string);
    }
  };
  //----------------------------------------

  return (
    <form onSubmit={handleSubmit(handleUrls)}>
      <div className={styles.fields}>
        <h1 className={styles.title}>{MY_WORK}</h1>

        <div className={styles.box}>
          <p className={styles.textInput}>
            {INPUT_FIRST}
            <span className={styles.star}>*</span>
          </p>
          <div className={styles.urlFirst}>
            <input
              type="text"
              {...register("urlFirst", {
                required: "URL is required",
                pattern: {
                  value: urlPattern,
                  message: "Invalid URL format",
                },
              })}
            />
          </div>
          <p className={styles.errorText}>
            {errors.urlFirst && (
              <span>{errors.urlFirst.message || URL_ERRORS}</span>
            )}
          </p>
        </div>

        <div className={styles.box}>
          <p className={styles.textInput}>
            {INPUT_SECOND} <span className={styles.star}>*</span>
          </p>
          <div className={styles.urlSecond}>
            <input
              type="text"
              {...register("urlSecond", {
                required: "URL is required",
                pattern: {
                  value: urlPattern,
                  message: "Invalid URL format",
                },
              })}
            />
          </div>
          <p className={styles.errorText}>
            {errors.urlSecond && (
              <span>{errors.urlSecond.message || URL_ERRORS}</span>
            )}
          </p>
        </div>

        <div className={styles.box}>
          <p className={styles.textInput}>
            {INPUT_THIRD} <span className={styles.star}>*</span>
          </p>
          <div className={styles.thirdUrl}>
            <input
              type="text"
              {...register("urlThird", {
                required: "URL is required",
                pattern: {
                  value: urlPattern,
                  message: "Invalid URL format",
                },
              })}
            />
          </div>
          <p className={styles.errorText}>
            {errors.urlThird && (
              <span>{errors.urlThird.message || URL_ERRORS}</span>
            )}
          </p>
        </div>

        <button
          type="submit"
          className={styles.buttonSubmit}
          disabled={!isValid}
        >
          {SUBMIT}
        </button>
      </div>
      {formError && <p className={styles.formError}>{formError}</p>}
    </form>
  );
};

export default Form;
