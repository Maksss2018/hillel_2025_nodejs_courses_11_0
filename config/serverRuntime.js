export const runServer = (startServer) => {
  startServer().catch((error) => {
    console.error("Server startup error:", error.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error.message);
    //  process.exit(1);
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error.message);
    //  process.exit(1);
  });
};
