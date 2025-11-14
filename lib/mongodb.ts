import mongoose from "mongoose"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "elevatefit"

if (!uri) {
  throw new Error("Missing MONGODB_URI. Set it in Project Settings > Environment Variables.")
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConnection: typeof mongoose | undefined
}

let connection: typeof mongoose

if (process.env.NODE_ENV === "development") {
  if (!global._mongooseConnection) {
    global._mongooseConnection = mongoose
  }
  connection = global._mongooseConnection
} else {
  connection = mongoose
}

export async function connectToDatabase() {
  if (connection.connection.readyState >= 1) {
    return connection
  }
  await connection.connect(uri!, { dbName })
  return connection
}

export { connection as mongoose }
