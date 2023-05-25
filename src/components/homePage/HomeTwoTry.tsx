import React from "react";
import TryUtm from "../tryUTM/TryUTM";
import styles from "./Home.module.css";
export default function HomeTwoTry() {
  return (
    <div>
      <section className={styles.try_section}>
        <TryUtm />
      </section>
    </div>
  );
}
