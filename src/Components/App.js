import React from "react";
import Search from "./Search";
import "../css/App.css"

function App() {
  return (
    <div className="app-container">
      <div className="row app-container__row">
        <div className="col-12">
          <div className="app-container__left">
            <Search/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
