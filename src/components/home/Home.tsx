import React from "react";
import homeStyles from "./styles/home.module.scss";
import Form from "../Form/Form";
import Content from "../content/Content";

const Home: React.FC = () => {

  return (
    <>
      <div className={homeStyles.wrapper}>
        <main className={homeStyles.main}>
          <Form />
          <Content />
        </main>
      </div>
    </>
  );
};

export default Home;
