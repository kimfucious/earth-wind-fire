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
  const [hideAll, setHideAll] = useState(false);

  useEffect(() => {
    console.log("Filter");
    const removed = { "🌎": hideEarth, "🌬️": hideWind, "🔥": hideFire };
    setFilteredData(
      data.filter(el => {
        console.log(removed[el]);
        return !removed[el] ? el : null;
      })
    );
    if (hideAll && !(hideEarth && hideWind && hideFire)) {
      setHideAll(true);
    } else if (!hideAll && (hideEarth && hideWind && hideFire)) {
      setHideAll(true);
    }
  }, [hideEarth, hideWind, hideFire, data]);

  useEffect(() => {
    console.log("Hide All");
    if (hideAll) {
      setHideEarth(true);
      setHideWind(true);
      setHideFire(true);
    } else {
      setHideEarth(false);
      setHideWind(false);
      setHideFire(false);
    }
  }, [hideAll]);

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
      <div className="d-flex justify-content-around mt-3">
        <div className="custom-control custom-checkbox">
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
        <div className="custom-control custom-checkbox">
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
        <div className="custom-control custom-checkbox">
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

      <div className="custom-control custom-switch my-4">
        <input
          type="checkbox"
          className="custom-control-input"
          id="customSwitch1"
          onChange={() => setHideAll(!hideAll)}
          checked={hideEarth && hideWind && hideFire}
        />
        <label className="custom-control-label" htmlFor="customSwitch1">
          Hide All
        </label>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
