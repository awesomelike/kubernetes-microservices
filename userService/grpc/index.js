const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const procedures = require('./procedures');

const server = new grpc.Server();

const PROTO_PATH = path.join(__dirname, 'user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
  oneofs: true,
});

const { userPackage } = grpc.loadPackageDefinition(packageDefinition);
const { UserService } = userPackage;

server.addService(UserService.service, {
  register: procedures.register,
  login: procedures.login,
  auth: procedures.auth,
});

module.exports = server;
