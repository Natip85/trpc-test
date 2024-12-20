import { existsSync, mkdirSync } from "fs";
import { pgGenerate } from "drizzle-dbml-generator";

import * as schema from "../src/server/db/schema";

// Ensure out directory exists
if (!existsSync("./out")) {
  mkdirSync("./out");
}

const out = "./out/schema.dbml";
const relational = true;

pgGenerate({ schema, out, relational });

console.log("Schema generated successfully at", out);
