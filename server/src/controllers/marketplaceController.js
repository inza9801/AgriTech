import {
  getListableBatches,
  createListing,
  getListingsSummary,
  getOffersForFarmer,
  updateOfferStatus,
  getOfferById,
  createOrderFromOffer,
} from "../models/marketplaceModel.js";

const DEFAULT_FARMER_ID = 1;

export const listableBatches = async (req, res, next) => {
  try {
    const batches = await getListableBatches(DEFAULT_FARMER_ID);
    res.json({ success: true, data: batches });
  } catch (err) {
    next(err);
  }
};

export const addListing = async (req, res, next) => {
  try {
    const { batch_id, quantity_tons, price_per_kg } = req.body;
    const listing = await createListing({ farmer_id: DEFAULT_FARMER_ID, batch_id, quantity_tons, price_per_kg });
    res.status(201).json({ success: true, data: listing });
  } catch (err) {
    next(err);
  }
};

export const summary = async (req, res, next) => {
  try {
    const data = await getListingsSummary(DEFAULT_FARMER_ID);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const offers = async (req, res, next) => {
  try {
    const data = await getOffersForFarmer(DEFAULT_FARMER_ID);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const acceptOffer = async (req, res, next) => {
  try {
    const offer = await getOfferById(req.params.id);
    if (!offer) {
      res.status(404);
      throw new Error("Offer not found");
    }
    await updateOfferStatus(offer.offer_id, "Accepted");
    const total_price = offer.quantity_tons * 1000 * offer.offer_price_per_kg;
    await createOrderFromOffer({
      farmer_id: DEFAULT_FARMER_ID,
      buyer_id: offer.buyer_id,
      listing_id: offer.listing_id,
      quantity_tons: offer.quantity_tons,
      total_price,
    });
    res.json({ success: true, message: "Offer accepted and order created" });
  } catch (err) {
    next(err);
  }
};

export const rejectOffer = async (req, res, next) => {
  try {
    await updateOfferStatus(req.params.id, "Rejected");
    res.json({ success: true, message: "Offer rejected" });
  } catch (err) {
    next(err);
  }
};