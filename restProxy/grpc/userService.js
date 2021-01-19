const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, 'user.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});

const { userPackage } = grpc.loadPackageDefinition(packageDefinition);
const { UserService } = userPackage;

const GRPC_HOST = process.env.GRPC_HOST || '0.0.0.0';
const GRPC_PORT = process.env.USER_GRPC_PORT || 50051;

let client = new UserService(`${GRPC_HOST}:${GRPC_PORT}`, grpc.credentials.createInsecure());

module.exports = client;
