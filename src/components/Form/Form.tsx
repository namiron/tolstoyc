import React from "react";
import { useForm } from "react-hook-form";
import {
  baseUrl,
  INPUT_FIRST,
  INPUT_SECOND,
  INPUT_THIRD,
  SUBMIT,
  TOLSTOY,
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
  const [secretToken, setSecretToken] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IUrls>({ mode: "onBlur" });

  // Function to fetch the secret token from the server
  const fetchSecretToken = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/get-secret-token`);
      const data = await response.json();
      setSecretToken(data.token);
    } catch (error) {
      console.error("Failed to fetch secret token:", error);
    }
  };

  // Fetch the secret token when the component mounts
  React.useEffect(() => {
    fetchSecretToken();
  }, []);

  const handleUrls = async (data: IUrls) => {
    try {
      if (data.secretToken) {
        console.log(data.secretToken);
      }
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
        <h1 className={styles.title}>{TOLSTOY}</h1>

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

        <input
          type="hidden"
          value={secretToken || ""}
          {...register("secretToken")}
        />
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
