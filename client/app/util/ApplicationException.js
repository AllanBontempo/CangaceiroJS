class ApplicationException extends Error{
    constructor(msg = "") {
        super();
        this.name = this.constructor.name;
    }
}
