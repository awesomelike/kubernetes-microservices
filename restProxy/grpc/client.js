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

// client.register({name:"Azamat", email: "azamat@gmail.com", password: "123456"}, (err, res) => {console.log(err);
// console.log});

// client.login({email: "azamat@gmail.com", password: "123456"}, (e, r) => {if (e) console.log(e); console.log(r)})
// client.auth({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE4MWU2YTVmLWM1MmItNGZmMC05OTRlLThkNjVmNGQ4MmZjMCIsImVtYWlsIjoiYXphbWF0QGdtYWlsLmNvbSIsImlhdCI6MTYxMDk5OTMyNCwiZXhwIjoxNjExMDAyOTI0fQ.ckGvHbMINUm6BKmKfgWhunpGsaCngG3306wHBr5osg8"}, (e,r) => console.log(r))
module.exports = client;
