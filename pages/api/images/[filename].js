// import path from 'path';
// import fs from 'fs';

// export default function handler(req, res) {
//   // Get the image filename from the query parameter
//   const { id } = req.query;
// //   console.log(filename)

//   // Define the path to the public folder
//   const imageDirectory = path.join(process.cwd(), 'public', 'images');

//   // Full path to the image
//   const filePath = path.join(imageDirectory, id);

//   // Check if the file exists
//   if (fs.existsSync(filePath)) {
//     // Set the appropriate content type (you can add more cases for PNG, GIF, etc.)
//     res.setHeader('Content-Type', 'image/jpeg');

//     // Read and send the file
//     const image = fs.readFileSync(filePath);
//     res.status(200).send(image);
//   } else {
//     // If the file is not found, return a 404
//     res.status(404).json({ message: 'Image not found' });
//   }
// }



// pages/api/uploads/[filename].js
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { filename } = req.query; // Get the filename from the URL

  const filePath = path.join(process.cwd(), 'upload', filename); // Build the path to the file
  try {
    const file = await fs.readFile(filePath); // Read the file
    res.setHeader('Content-Type', 'image/jpeg'); // Set the content type (can be changed based on file type)
    res.status(200).send(file); // Send the file in the response
  } catch (error) {
    res.status(404).json({ message: 'File not found' }); // Handle errors
  }
}

