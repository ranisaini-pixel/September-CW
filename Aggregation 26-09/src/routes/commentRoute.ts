import { Router } from "express";
import {
  aggregation1,
  aggregation2,
  aggregation3,
  aggregation4,
  aggregation5,
} from "../controllers/commentController";
const router = Router();

router.get("/aggregateData1", aggregation1);
router.get("/aggregateData2", aggregation2);
router.get("/aggregateData3", aggregation3);
router.get("/aggregateData4", aggregation4);
router.get("/aggregateData5", aggregation5);

export default router;
