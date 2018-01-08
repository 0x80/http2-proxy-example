import { Router } from "express";
import * as proxy from "http2-proxy";

const router = Router();

router.use(async (req, res) => {
  console.log(`Proxy clientRequest url: ${req.url}`);

  try {
    await proxy.web(req, res, {
      hostname: "api.flightstats.com",
      port: 443,
      onReq: (req, { headers }) => {
        headers!["x-forwarded-host"] = req.headers!.host;
      }
    });
  } catch (err) {
    console.error(`Proxy failed: ${err.message}`);
  }
});

export default router;
