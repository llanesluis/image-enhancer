import mogoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONFODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

//Crear una conexion cahcheada a la base de datos
//para evitar crear multiples conexiones a la base de datos, porque next usa una conexion para cada request
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error("No se ha encontrado la variable de entorno MONGODB_URL");
  }

  //Si no existe una conexion, crear una nueva
  cached.promise =
    cached.promise ||
    mogoose.connect(MONGODB_URL, {
      dbName: "pickuro",
      bufferCommands: false,
    });

  //Asignar la conexion a la cache
  cached.conn = await cached.promise;
  return cached.conn;
};
