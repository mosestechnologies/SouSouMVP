class Auth {

    constructor () {
        this.authenticated = false;
    }

    login (callback) {
        if (localStorage.getItem)
        this.authenticated = true;
        //callback();
    }

    logout (callback) {
        this.authenticated = false;
        //callback();
    }

    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();