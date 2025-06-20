import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";
import { users } from "../app/db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env file");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const main = async () => {
  console.log("Seeding database...");

  const data: (typeof users.$inferInsert)[] = [
    { firstname: "John", lastname: "Doe", employed: "Manager", active: true },
    { firstname: "Jane", lastname: "Smith", employed: "Developer", active: true },
    { firstname: "Peter", lastname: "Jones", employed: "Developer", active: false },
    { firstname: "Marie", lastname: "Dubois", employed: "Manager", active: true },
    { firstname: "Pierre", lastname: "Martin", employed: "Developer", active: true },
    { firstname: "Sophie", lastname: "Bernard", employed: "Developer", active: true },
    { firstname: "Michel", lastname: "Petit", employed: "Manager", active: false },
    { firstname: "Isabelle", lastname: "Robert", employed: "Developer", active: true },
    { firstname: "François", lastname: "Richard", employed: "Developer", active: true },
    { firstname: "Catherine", lastname: "Durand", employed: "Manager", active: true },
    { firstname: "Jean", lastname: "Leroy", employed: "Developer", active: false },
    { firstname: "Luc", lastname: "Moreau", employed: "Manager", active: true },
    { firstname: "Julie", lastname: "Simon", employed: "Developer", active: true },
    { firstname: "Nicolas", lastname: "Laurent", employed: "Developer", active: true },
    { firstname: "Emma", lastname: "Garcia", employed: "Manager", active: true },
    { firstname: "Thomas", lastname: "Faure", employed: "Developer", active: false },
    { firstname: "Laura", lastname: "Girard", employed: "Developer", active: true },
    { firstname: "Antoine", lastname: "Lambert", employed: "Manager", active: true },
    { firstname: "Camille", lastname: "Roux", employed: "Developer", active: true },
    { firstname: "Paul", lastname: "Fontaine", employed: "Developer", active: true },
    { firstname: "Alice", lastname: "Chevalier", employed: "Manager", active: false },
    { firstname: "Louis", lastname: "Guerin", employed: "Developer", active: true },
    { firstname: "Chloé", lastname: "Leclerc", employed: "Developer", active: true },
    { firstname: "Hugo", lastname: "Marchand", employed: "Manager", active: true },
    { firstname: "Manon", lastname: "Blanc", employed: "Developer", active: false },
    { firstname: "Lucas", lastname: "Barbier", employed: "Developer", active: true },
    { firstname: "Léa", lastname: "Benoit", employed: "Manager", active: true },
    { firstname: "Mathieu", lastname: "Perrot", employed: "Developer", active: true },
    { firstname: "Sarah", lastname: "Meyer", employed: "Developer", active: true },
    { firstname: "Adrien", lastname: "Paris", employed: "Manager", active: true },
  ];

  await db.insert(users).values(data).onConflictDoNothing();

  console.log("Database seeded successfully!");

  // C'est crucial de fermer la connexion pour que le script se termine.
  await pool.end();
};

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
