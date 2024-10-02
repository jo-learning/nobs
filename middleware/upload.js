import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';


// Custom handler for parsing form-data (for handling `multipart/form-data`)
export const config = {
  api: {
    bodyParser: false,  // Disable default body parsing because multer handles it
  },
};


const stat = promisify(fs.stat);

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'public', 'images');
    console.log(uploadPath)
    
    // Ensure the folder exists, create if not
    try {
      await stat(uploadPath);
    } catch (error) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique name for the file
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer for file upload
const upload = multer({ storage });








// Wrapper function to use multer with Next.js API routes
// export const uploadMiddleware = (req, res, next) => {
//     upload.single('image')(req, res, (err) => {
      
//       if (err) {
//         return res.status(500).json({ success: false, message: err.message });
//       }
//       next();
//     });
//   };
export const uploadMiddleware = upload.single('image');