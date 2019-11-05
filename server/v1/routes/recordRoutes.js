import { Router } from 'express';
import RecordController from '../controllers/recordController';
import Middleware from '../middleware/middleware';
import { upload } from '../data/data';


const router = Router();

router.post('/', Middleware.auth, upload.single('media'), Middleware.validateRecord, RecordController.createRecord);

export default router;
