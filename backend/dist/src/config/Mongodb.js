"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URI = process.env.MONGODB_URL || "mongodb://admin:123456@localhost:27017/admin";
const dbInit = () => mongoose_1.default.connect(URI, { dbName: "images" }, (err) => {
    if (err)
        console.log(err.message);
    console.log("MongoDB conectado com sucesso!");
});
exports.default = dbInit;
//# sourceMappingURL=Mongodb.js.map