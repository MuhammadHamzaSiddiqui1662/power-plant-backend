import { Router } from "express";

const router = Router();

router.get("/", (req: any, res: any) => {
  console.log(`${req.protocol}://${req.get("host")}/test`);
});

export const TestRouter = router;
