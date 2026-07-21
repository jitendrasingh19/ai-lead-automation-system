import { Pool } from "pg";

// console.log("DATABASE_URL =", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("✅ PostgreSQL Connected:", res.rows[0]);
  })
  .catch((err) => {
    console.error("❌ PostgreSQL Connection Error:", err);
  });

export default pool;
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);