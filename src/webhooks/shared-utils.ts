import Asana from "asana";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

let client = Asana.ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.ASANA_PERSONAL_ACCESS_TOKEN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFilePath = path.join(__dirname, "../..", ".env");

const getXHookSecret = () => {
  const envContent = fs.readFileSync(envFilePath, "utf8");
  const match = envContent.match(/X_HOOK_SECRET=(.*)/);
  return match ? match[1] : "";
};

export { Asana, fs, path, fileURLToPath, crypto, express , getXHookSecret, envFilePath };
