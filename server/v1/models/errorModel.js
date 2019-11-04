
class ServerError extends Error {
  constructor(status) {
    super();
    this.name = this.constructor.name;
    this.status = status;
  }
}

export default ServerError;
