const grpc = require('grpc');
const Database = require('./db');
const grpcServer = require('./grpc');

require('dotenv').config();

let cachedDB = null;

async function init() {
  // Setup MongoDB
  if (cachedDB && cachedDB.serverConfig.isConnected()) {
    console.log('using cached database instance');
    Promise.resolve(cachedDB);
  } else {
    const db = new Database();
    console.log('creating new Db connection');
    cachedDB = db.connect();
  }

  // Setup gRPC
  const GRPC_HOST = process.env.GRPC_HOST || '0.0.0.0';
  const GRPC_PORT = process.env.GRPC_PORT || '50051';
  const address = `${GRPC_HOST}:${GRPC_PORT}`;
  grpcServer.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
    grpcServer.start();
    console.log(`Server running at ${address}`);
  });
}

init();
