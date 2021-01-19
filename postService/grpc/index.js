const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const procedures = require('./procedures');

const server = new grpc.Server();

const PROTO_PATH = path.join(__dirname, 'post.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
  oneofs: true,
});

const { postPackage } = grpc.loadPackageDefinition(packageDefinition);
const { PostService } = postPackage;

server.addService(PostService.service, {
  listAll: procedures.listAll,
  create: procedures.create,
  listUserPosts: procedures.listUserPosts
});

module.exports = server;
