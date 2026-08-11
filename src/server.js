import app from './app.js';
import envConfig from './config/env.config.js';
import connectDB from './config/db.config.js';
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception thrown:', err);
  process.exit(1);
});

let server;

// Connect Database and Start Server
connectDB()
  .then(() => {
    server = app.listen(envConfig.port, () => {
      console.log(`Server running on port ${envConfig.port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to database connection failure:', err);
    process.exit(1);
  });

// Handle Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.error('[CRITICAL] Unhandled Rejection:', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Shutting down gracefully...');
  if (server) {
    server.close(() => {
      console.log('HTTP server closed.');
    });
  }
});
