import Helpers from '../helpers/helpers';
import { records } from '../data/data';

class Record {
  constructor(authorId, title, type, location, mediaUrl, comment) {
    this.id = Helpers.setId(records);
    this.createdOn = new Date().toLocaleString();
    this.authorId = authorId;
    this.title = title;
    this.type = type;
    this.location = location;
    this.status = 'unresolved';
    this.mediaUrl = mediaUrl;
    this.comment = comment;
  }
}

export default Record;
