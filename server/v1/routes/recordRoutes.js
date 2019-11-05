import { Router } from 'express';
import RecordController from '../controllers/recordController';
import Middleware from '../middleware/middleware';
import { upload } from '../data/data';


const router = Router();

router.post('/', Middleware.auth, upload.single('media'), Middleware.validateRecord, RecordController.createRecord);
router.get('/all', Middleware.auth, RecordController.getAll);
router.get('/red-flags', Middleware.auth, RecordController.getRedFlags);
router.get('/interventions', Middleware.auth, RecordController.getInterventions);

export default router;
