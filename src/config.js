const production = process.env.NODE_ENV === "production";
const config = {
  googleTrackerID: production ? process.env.googleTrackerID : null,
};

export default config;
