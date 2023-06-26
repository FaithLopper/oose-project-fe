export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const feEnv = {
    HOST: process.env.REACT_APP_HOST,
    RECAPTCHA_KEY: process.env.REACT_APP_RECAPTCHA_KEY

}

export default feEnv