import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import noImage from "../../image/No_Image.jpg";
import styles from "../content/style/content.module.scss";
import { NO_DATA, SEE_SITE } from "../common/constant";

const Content: React.FC = () => {
  //--------------------------------
  const metaData = useAppSelector((state) => state.urls.metaData);
  //--------------------------------

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        {metaData.length > 0 ? (
          metaData.map((item, index) => (
            <div key={index} className={styles.card}>
              {item.image ? (
                <div className={styles.image}>
                  <img src={item.image} alt={item.title} />
                </div>
              ) : (
                <div className={styles.image}>
                  <img src={noImage} alt="image" />
                </div>
              )}
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <a href={item.url} target="_blank" className={styles.link}>
                {SEE_SITE}
              </a>
            </div>
          ))
        ) : (
          <p>{NO_DATA}</p>
        )}
      </div>
    </div>
  );
};

export default Content;
