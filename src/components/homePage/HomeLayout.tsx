import React from "react";
import HomeOne from "./HomeOne";
import styles from "./Home.module.css";
export default function HomeLayout() {
  return (
    <div className={styles.container}>
      <HomeOne />
    </div>
  );
}
