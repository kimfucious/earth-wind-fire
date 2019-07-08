import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Flipper, Flipped } from "react-flip-toolkit";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

function App() {
  const initialData = ["🌎", "🌬️", "🔥"];
  const [data] = useState(initialData);
  const [filteredData, setFilteredData] = useState(data);
  const [hideEarth, setHideEarth] = useState(false);
  const [hideWind, setHideWind] = useState(false);
  const [hideFire, setHideFire] = useState(false);

  useEffect(() => {
    const removed = { "🌎": hideEarth, "🌬️": hideWind, "🔥": hideFire };
    setFilteredData(
      data.filter(el => {
        return !removed[el] ? el : null;
      })
    );
  }, [hideEarth, hideWind, hideFire, data]);

  const hideAll = () => {
    setHideEarth(true);
    setHideWind(true);
    setHideFire(true);
  };

  const showAll = () => {
    setHideEarth(false);
    setHideWind(false);
    setHideFire(false);
  };

  const renderData = () => {
    return filteredData.map(el => (
      <Flipped key={filteredData.indexOf(el)} flipId={el}>
        <li className="list-group-item lead">{el}</li>
      </Flipped>
    ));
  };
  return (
    <div
      className="d-flex flex-column container text-center"
      style={{ maxWidth: "800px" }}
    >
      <div className="display-4 text-center my-5" style={{ fontSize: "42px" }}>
        React Flip ToolKit Example
      </div>
      <Flipper flipKey={filteredData}>
        <ul
          className={`list-group text-center animated ${
            filteredData.length === 0 ? "fadeOut" : "fadeIn"
          }`}
        >
          {renderData()}
        </ul>
      </Flipper>
      <div className="d-flex justify-content-center my-4">
        <div className="custom-control custom-checkbox mx-3">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
            name="earth"
            onChange={() => setHideEarth(!hideEarth)}
            checked={hideEarth}
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Hide Earth
          </label>
        </div>
        <div className="custom-control custom-checkbox mx-3">
          <input
            className="custom-control-input"
            id="customCheck2"
            name="wind"
            onChange={() => setHideWind(!hideWind)}
            checked={hideWind}
            type="checkbox"
          />
          <label className="custom-control-label" htmlFor="customCheck2">
            Hide Wind
          </label>
        </div>
        <div className="custom-control custom-checkbox mx-3">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck3"
            name="fire"
            onChange={() => setHideFire(!hideFire)}
            checked={hideFire}
          />
          <label className="custom-control-label" htmlFor="customCheck3">
            Hide Fire
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mx-2" onClick={showAll}>
          Show All
        </button>
        <button className="btn btn-danger mx-2" onClick={hideAll}>
          Hide All
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
