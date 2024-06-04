const env = process.env.NODE_ENV ?? "development";

const getOptions = (env: string) => {
  switch (env) {
    case "development":
      return {
        origin: "*",
        credentials: true,
      };
    case "production":
      return {
        origin: [process.env.FRONT_URL],
        credentials: true,
      };
    default:
      return {
        origin: ["http://localhost:3000", "https://localhost:3000"],
        credentials: true,
      };
  }
};
const corsOptions = getOptions(env);

export default corsOptions;
