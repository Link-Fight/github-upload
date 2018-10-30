export default function (idle, action) {
    let last
    return function () {
        let ctx = this
        let args = arguments
        clearTimeout(last)
        last = setTimeout(function () {
            action.apply(ctx, args)
        }, idle)
    }
};