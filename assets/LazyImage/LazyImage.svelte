
<img class="lazy" src="{placeholderSource}" data-src="{imageToLazyLoad}" alt="{altText}">

<script>
    export default {
        data(){
            return {
               placeholderSource: '',
               imageToLazyLoad: '',
               altText: ''
            }
        },
        oncreate(){
            let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
            let active = false;
            const lazyLoad = function() {
                    if (active === false) {
                       active = true;

                        setTimeout(function() {
                            lazyImages.forEach(function(lazyImage) {
                            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                                lazyImage.src = lazyImage.dataset.src;
                                lazyImage.srcset = lazyImage.dataset.srcset;
                                lazyImage.classList.remove("lazy");

                                lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                                });

                                if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                                }
                            }
                            });

                            active = false;
                        }, 200);
                }
            }
        }
    }
</script>