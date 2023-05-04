import React from "react";
import HomeOne from "./HomeOne";
import styles from "./Home.module.css";
import HomeOneTwo from "./HomeOneTwo";
import HomeTwoTry from "./HomeTwoTry";
export default function HomeLayout() {
  return (
    <div className={styles.container}>
      <HomeOne />
      <HomeOneTwo />
      <HomeTwoTry />
    </div>
  );
}
