import * as express from "express";
import * as https from "https";
import * as fs from "fs";
import { join } from "path";
import flightstats from "./proxy/flightstats";

/**
 * Standalone proxy using http2-proxy and SSL
 *
 * Test with:
 * curl -i --cacert ./ssl/cert.pem https://localhost:8008/api/flightstats/flex/airports/rest/v1/json/all
 */
const app = express();
app.enable("trust proxy");
app.get("/", (req, res) => {
  res.send("Safe and secure!");
});

app.use("/api/flightstats", flightstats);

const key = fs.readFileSync(join(__dirname, "..", "ssl", "key.pem"));
const cert = fs.readFileSync(join(__dirname, "..", "ssl", "cert.pem"));

const server = https.createServer(
  {
    key,
    cert,
    passphrase: "secret"
  },
  app
);

server.listen(8008);
console.log("Listening on 8008");
