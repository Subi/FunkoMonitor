class Monitor{
    constructor(status){
       this.status = status;
    }

    On(){
        this.status = true;
    }
    Off(){
        this.status = false;
    }
}
module.exports = Monitor;