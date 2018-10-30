import 'intersection-observer'
export default {
    inserted(el, binding) {
        try {
            if (binding.value !== false) {
                var options = {
                    rootMargin: '0px',
                    threshold: [0.5, 1.0]
                }
                var callback = function (entries, observer) {
                    entries.forEach(entri => {
                        if (entri.intersectionRatio === 1) {
                            entri.target.children[0].classList.remove('xa-fixed-top')
                        } else {
                            entri.target.children[0].classList.add('xa-fixed-top')
                        }
                        if (entri.boundingClientRect.height) {
                            entri.target.style.height = entri.boundingClientRect.height + 'px'
                        }
                    })
                }
                var observer = new IntersectionObserver(callback, options)
                observer.observe(el)
            }
        } catch (error) {
            console.log(error)
        }
    }
}