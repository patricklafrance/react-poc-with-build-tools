import "./app.css";

import Header from "./layout.header";
import Main from "./layout.main";
import React from "react";
import Sidebar from "./layout.sidebar";
import UnmanagedErrorNotification from "./unmanaged-error-notification";

const App = () => (
  <div className="wrapper">
    <div className="sidebar-column">
      <Sidebar />
    </div>
    <div className="main-column">
      <Header />
      <Main />
      <UnmanagedErrorNotification />
    </div>
  </div>
);

export default App;

