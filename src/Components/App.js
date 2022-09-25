import React from "react";
import Search from "./Search";
import "../css/App.css"
import "../css/styles.css"

function App() {
  return (
    <div className="app-container">
      <div className="row app-container__row">
        <div className="col-12 app-container__container">
          <div className="app-container__left">
            <Search/>
            <div>
              Filter
            </div>
          </div>
          <div className="app-container__right">
            <div className="card card-container">
              <div className="card-body">
                Graph data
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
