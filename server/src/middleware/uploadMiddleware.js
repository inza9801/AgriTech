import multer from "multer";

// Store uploaded images in memory only.
// Images are forwarded directly to the ML service and are never
// written to disk or stored in the database.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPG, JPEG and PNG images are allowed."));
  }

  cb(null, true);
};

export const uploadLeafImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});