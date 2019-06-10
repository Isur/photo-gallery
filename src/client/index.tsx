import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactGA from "react-ga";
import config from "../config";
import App from "./Pages/App";

ReactGA.initialize(config.googleTrackerID);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById("react-app"));
