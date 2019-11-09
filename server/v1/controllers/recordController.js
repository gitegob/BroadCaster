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

  static getRecords(req, res) {
    const { id, isAdmin } = req.payload;
    const result = [];
    if (isAdmin) {
      records.forEach((rec) => result.push(rec));
    } else {
      records.forEach((record) => {
        if (`${record.authorId}` === `${id}`) result.push(record);
      });
    }
    Helpers.sendSuccess(res, 200, 'Records fetched successfully', { records: result });
  }

  static getRedFlags(req, res) {
    Helpers.sendUserRecordsByType(res, req.payload.id, req.payload.isAdmin, 'red-flag');
  }

  static getInterventions(req, res) {
    Helpers.sendUserRecordsByType(res, req.payload.id, req.payload.isAdmin, 'intervention');
  }

  static getARecord(req, res) {
    const { recordID } = req.params;
    const { id, isAdmin } = req.payload;
    const record = Helpers.findUserRecord(recordID, isAdmin, id);
    if (record) Helpers.sendSuccess(res, 200, 'Record fetched successfully', { record });
    else Helpers.sendError(res, 404, 'Record not found');
  }

  static updateARecord(req, res) {
    const {
      title, type, location, comment,
    } = req.body;
    const record = Helpers.findUserRecord(req.params.recordID, req.payload.id);
    if (record) {
      if (record.status === 'pending') {
        record.title = title || record.title;
        record.type = type || record.type;
        record.location = location || record.location;
        record.comment = comment || record.comment;
        Helpers.sendSuccess(res, 200, 'Record edited successfully', { record });
      } else Helpers.sendError(res, 403, 'Record cannot be edited');
    } else Helpers.sendError(res, 404, 'Record not found');
  }

  static updateStatus(req, res) {
    const { status } = req.body;
    const { recordID } = req.params;
    const record = records.find((rec) => `${rec.id}` === `${recordID}`);
    if (record) {
      record.status = status;
      Helpers.sendSuccess(res, 200, 'Record status updated successfully', { status: record.status });
    } else Helpers.sendError(res, 404, 'Record not found');
  }

  static deleteARecord(req, res) {
    const record = Helpers.findUserRecord(req.params.recordID, req.payload.id);
    if (record) {
      if (record.status === 'pending') {
        records.splice(records.indexOf(record), 1);
        Helpers.sendSuccess(res, 200, 'Record deleted successfully');
      } else Helpers.sendError(res, 403, 'Record cannot be deleted');
    } else Helpers.sendError(res, 404, 'Record not found');
  }
}

export default RecordController;
