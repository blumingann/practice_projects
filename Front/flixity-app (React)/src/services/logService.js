import Raven from "raven-js";

function init() {
  Raven.config(
    "https://c33c88233f9147e98a51314b0ac39b8c@o446457.ingest.sentry.io/5424913",
    {
      release: "1-0-0",
      environment: "development-test"
    }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
