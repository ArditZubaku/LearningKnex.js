import { error, log } from "console";
import { onDatabaseConnect } from "./config/knex";

onDatabaseConnect()
  .then(() => log("Database connected"))
  .catch((err) => error(err));
