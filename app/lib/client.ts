import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import 'dotenv/config'; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

const db = drizzle( pool );

export default db; 