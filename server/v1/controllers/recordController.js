import multer from 'multer';
import Record from '../models/recordModel';
import { records } from '../data/data';
import Helpers from '../helpers/helpers';

class RecordController {
  static createRecord(req, res) {
    const { id } = req.payload;
    const {
      title, type, location, comment,
    } = req.body;
    let newRecord;
    if (!req.file) {
      newRecord = new Record(id, title, type, location, 'noMedia', comment);
    } else {
      const { path: mediaUrl } = req.file;
      newRecord = new Record(id, title, type, location, mediaUrl, comment);
    }
    records.push(newRecord);
    Helpers.sendSuccess(res, 201, 'Record created successfully', { record: newRecord });
  }
}

export default RecordController;
