export function isFunction(fn) {
    return typeof fn === 'function'
}
export function isObject(obj) {
    return typeof obj === 'object'
}
export function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}
class MyPromise {
    static resolve(result) {
        return new MyPromise(result, 'fulfilled')
    }

    static reject(result) {
        return new MyPromise(result, 'rejected')
    }
    constructor(fn, state) {
        this.id = 0
        this.thens = []
        this.catchs = []
        this.state = state || 'pending'
        this.result = null
        this.resolve = (result) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.result = result
                this._handleFn(this.thens)
            }
        }
        this.reject = (e) => {
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
    then(fn) {
        var curPromise = new MyPromise((resolve) => {
            this.thens.push({
                fn,
                result: null,
                resolve
            })
        })
        if (this.state === 'fulfilled') {
            this._handleFn(this.thens)
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


// var promise = new MyPromise((resolve, reject) => { })

var myPromise = new MyPromise(resolve => {
    console.log('fulfilled', 123)
    resolve(233)
})

myPromise.then(data => {
    console.log(data)
})
var myRejectPromise = new MyPromise((resolve, reject) => {
    reject(233)
})

myRejectPromise.then(data => {
    console.log('then', data)
})

myRejectPromise.catch(data => {
    console.log('catch', data)
})

var myTimePromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('3000')
    }, 3000)
});
myTimePromise.then(data => console.log(data))