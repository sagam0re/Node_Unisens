export default () => {
  return {
    database: {
      uri:
        process.env.TEST === 'true'
          ? process.env.TEST_DB_URI
          : process.env.DB_URI,
    },
    telegram: {
      token: process.env.TOKEN,
    },
    weatherApi: {
      key: '301cfca1807667be78088be8e48d88b8',
    },
  };
};
