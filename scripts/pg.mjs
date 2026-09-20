import os from "node:os";
import path from "node:path";
import EmbeddedPostgres from "embedded-postgres";

// Windows + UTF8 cluster cannot live under a Cyrillic project path.
const databaseDir = path.join(os.homedir(), "AppData", "Local", "meridian-pgdata");

const pg = new EmbeddedPostgres({
  databaseDir,
  user: "meridian",
  password: "meridian",
  port: 5433,
  persistent: true,
});

await pg.initialise();
await pg.start();

try {
  await pg.createDatabase("meridian");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (!/already exists/i.test(message)) {
    throw error;
  }
}

console.log("PostgreSQL is running at postgresql://meridian:meridian@localhost:5433/meridian");
console.log("Keep this process open. Stop with Ctrl+C.");

const stop = async () => {
  await pg.stop();
  process.exit(0);
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
