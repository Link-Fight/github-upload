function isFunction(fn) {
    return typeof fn === 'function'
}
function isObject(obj) {
    return typeof obj === 'object'
}
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}

class MyPromise {
    static fn() { }
    static resolve(result) {
        return new MyPromise(result, 'fulfilled')
    }

    static reject(result) {
        return new MyPromise(result, 'rejected')
    }
    _getThen(resolver) {
        if (resolver && resolver.then && isFunction(resolver.then)) {
            return resolver.then
        }
    }
    constructor(fn, state) {
        this.id = 0
        this.thens = []
        this.catchs = []
        this.state = state || 'pending'
        this.result = null
        this.resolve = (result) => {
            if (this.state === 'pending') {
                let then = this._getThen(result)
                if (then) {
                    let self = this
                    result.then(self.resolve, self.reject)
                } else {
                    this.state = 'fulfilled'
                    this.result = result
                    this._handleFn(this.thens)
                }
            }
        }
        this.reject = (e) => {
            console.log('reject')
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.result = e
                this._handleFn(this.catchs)
            }
        }
        if (fn instanceof Function) {
            fn(this.resolve, this.reject)
        } else {
            this.result = fn
        }
    }
    _handleFn(queue) {
        while (queue.length) {
            let curFn = queue.pop()
            curFn.resolve(curFn.fn(this.result))
        }
    }
    then(fn, catchFn) {
        var curPromise = new MyPromise((resolve, reject) => {
            fn && this.thens.push({
                fn,
                result: null,
                resolve
            })
            catchFn && this.catchs.push({
                fn: catchFn,
                result: null,
                resolve: reject
            })
        })
        if (this.state === 'fulfilled') {
            this._handleFn(this.thens)
        } else if (this.state === 'rejected') {
            this._handleFn(this.catchs)
        }
        return curPromise
    }
    catch(fn) {
        var curPromise = new MyPromise((resolve) => {
            this.catchs.push({
                fn,
                result: null,
                resolve
            })
        })
        if (this.state === 'rejected') {
            this._handleFn(this.catchs)
        }
        return curPromise
    }
}

let testPromise = new MyPromise(resolve => {
    console.log(1)
    setTimeout(() => {
        resolve(2)
    }, 10000)
})

testPromise.then(console.log)

let testPromise1 = new MyPromise((resolve, reject) => {
    console.log(1)
    setTimeout(() => {
        reject(-1)
    }, 5000)
})

testPromise1.then(console.error, console.warn)

let promisePromise = new MyPromise((resolve, reject) => {
    console.log(1)
    let promise = new MyPromise(resolve => {
        console.log(2)
        setTimeout(() => {
            resolve(3)
        }, 5000)
    })
    resolve(promise)
})

promisePromise.then(console.log)