import * as React from "react";
import "./App.css";
import LibraryGrid from "./Library/LibraryGrid";
import TopMenuLegacy from "./Menu/TopMenuLegacy";

function App() {
  return (
    <React.Fragment>
      <TopMenuLegacy />
      <LibraryGrid />
    </React.Fragment>
  );
}

export default App;
