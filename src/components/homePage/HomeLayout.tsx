import React from "react";
import HomeOne from "./HomeOne";
import styles from "./Home.module.css";
import HomeOneTwo from "./HomeOneTwo";
import HomeTwoTry from "./HomeTwoTry";
import HomeTwo from "./HomeTwo";
import HomeThree from "./HomeThree";
import HomeFour from "./HomeFour";
import HomeFive from "./HomeFive";
import HomeSix from "./HomeSix";
import HomeSeven from "./HomeSeven";
import HomeEight from "./HomeEight";
export default function HomeLayout() {
  return (
    <div className={styles.container}>
      <HomeOne />
      <HomeOneTwo />
      <HomeTwoTry />
      <HomeTwo />
      <HomeThree />
      <HomeFour />
      <HomeFive />
      <HomeSix />
      <HomeSeven />
      <HomeEight />
    </div>
  );
}
