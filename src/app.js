import Header from "./layout.header";
import Main from "./layout.main";
import React from "react";
import Sidebar from "./layout.sidebar";
import UnmanagedErrorNotification from "./unmanaged-error-notification";
import styles from "./app.scss";

const App = () => (
  <div className={styles.wrapper}>
    <div className={styles.sidebarColumn}>
      <Sidebar />
    </div>
    <div className={styles.mainColumn}>
      <Header />
      <Main />
      <UnmanagedErrorNotification />
    </div>
  </div>
);

export default App;

