import { Router, Request, Response } from 'express';
import { upload } from '../utils/cloudinary';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/image', authenticate as any, upload.single('image'), (req: Request, res: Response) => {
  try {
    const fileReq = req as any;
    if (!fileReq.file) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: fileReq.file.path,
      },
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
