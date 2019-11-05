import multer from 'multer';
import Record from '../models/recordModel';
import { records } from '../data/data';
import Helpers from '../helpers/helpers';

class RecordController {
  static createRecord(req, res) {
    const { id, email } = req.payload;
    const {
      title, type, location, comment,
    } = req.body;
    let newRecord;
    if (!req.file) {
      newRecord = new Record(id, email, title, type, location, 'noMedia', comment);
    } else {
      const { path: mediaUrl } = req.file;
      newRecord = new Record(id, email, title, type, location, mediaUrl, comment);
    }
    records.push(newRecord);
    Helpers.sendSuccess(res, 201, 'Record created successfully', { record: newRecord });
  }

  static getAll(req, res) {
    const { email } = req.payload;
    const result = [];
    records.forEach((record) => {
      if (record.authorEmail === email) result.push(record);
    });
    Helpers.sendSuccess(res, 200, 'Records fetched successfully', { records: result });
  }

  static getRedFlags(req, res) {
    Helpers.getUserRecordsByType(res, req.payload.email, 'red-flag');
  }

  static getInterventions(req, res) {
    Helpers.getUserRecordsByType(res, req.payload.email, 'intervention');
  }
}

export default RecordController;
