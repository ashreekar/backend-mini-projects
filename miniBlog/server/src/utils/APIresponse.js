class APIResponse{
    constructor(statuscode,message="Sucess"){
        this.statuscode=statuscode;
        this.message=message;
        this.success = statuscode < 400;
    }
}

export {APIResponse};