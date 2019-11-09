import Helpers from '../helpers/helpers';
import { records } from '../data/data';

class Record {
  constructor(authorId, fName, lName, title, type, location, mediaUrl, comment) {
    this.id = Helpers.setId(records);
    this.createdOn = new Date().toLocaleString();
    this.authorId = authorId;
    this.authorName = `${fName} ${lName}`;
    this.title = title;
    this.type = type;
    this.location = location;
    this.status = 'pending';
    this.mediaUrl = mediaUrl;
    this.comment = comment;
  }
}

export default Record;
