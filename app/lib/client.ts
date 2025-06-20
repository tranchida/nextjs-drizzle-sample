import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import 'dotenv/config'; 

// Déclare une propriété sur l'objet global pour TypeScript
declare global {
  // eslint-disable-next-line no-var
  var pool: Pool | undefined;
}

const pool =
  global.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL!,
  });

if (process.env.NODE_ENV !== "production") {
  global.pool = pool;
}

const db = drizzle(pool, { logger: true });

console.log(process.env.DATABASE_URL);

export default db;