import { Router } from 'express';
import RecordController from '../controllers/recordController';
import Middleware from '../middleware/middleware';
import upload from '../config/uploadConfig';

const router = Router();

router.post('/', Middleware.auth, upload.single('media'), Middleware.validateRecord, RecordController.createRecord);
router.get('/', Middleware.auth, RecordController.getRecords);
router.get('/red-flags', Middleware.auth, RecordController.getRedFlags);
router.get('/interventions', Middleware.auth, RecordController.getInterventions);
router.get('/:recordID', Middleware.auth, Middleware.validateParams, RecordController.getARecord);
router.patch('/:recordID', Middleware.auth, Middleware.validateParams, Middleware.validateRecord, RecordController.updateARecord);
router.delete('/:recordID', Middleware.auth, Middleware.validateParams, RecordController.deleteARecord);
router.patch('/:recordID/status', Middleware.auth, Middleware.validateParams, Middleware.adminAuth, Middleware.validateStatus, RecordController.updateStatus);

export default router;
