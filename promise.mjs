// Copyright (C) 2021 Paul Ciarlo

function ResolvablePromise() {
    this.resolvefun = null;
    this.rejectfun = null;
    this.state = 'pending';
    this.value = void 0;
    this.p = new Promise((resolve,reject) => {
        this.resolvefun=resolve;
        this.rejectfun=reject;
    });
}

ResolvablePromise.prototype = Object.assign(Object.create(Promise.prototype), {
    constructor: ResolvablePromise,
    resolve(value) {
        this.state = 'resolved';
        this.value = value;
        return this.resolvefun.call(this.p, value);
    },
    reject(value) {
        this.state = 'rejected';
        this.value = value;
        return this.rejectfun.call(this.p, value);
    },
    then(fun) {
        return this.p.then(fun);
    },
    catch(fun) {
        return this.p.catch(fun);
    },
    finally(fun) {
        return this.p.finally(fun);
    },
    async wait() {
        return await this.p;
    },
});

export default ResolvablePromise;
