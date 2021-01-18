const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, '../../protos/user/user.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});

const { userPackage } = grpc.loadPackageDefinition(packageDefinition);
const { UserService } = userPackage;

let client = new UserService('0.0.0.0:50051', grpc.credentials.createInsecure());

module.exports = client;
