import express from "express";
import {
  listableBatches,
  addListing,
  summary,
  offers,
  acceptOffer,
  rejectOffer,
} from "../controllers/marketplaceController.js";

const router = express.Router();

router.get("/listable-batches", listableBatches);
router.post("/listings", addListing);
router.get("/summary", summary);
router.get("/offers", offers);
router.patch("/offers/:id/accept", acceptOffer);
router.patch("/offers/:id/reject", rejectOffer);

export default router;