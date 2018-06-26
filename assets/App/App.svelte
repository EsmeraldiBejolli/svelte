
<h1>{headline}</h1>
<LazyImage />

<script>
import LazyImage from '../LazyImage/LazyImage.svelte';

export default {
    data() {
        return {
            headline: 'wellcome to my aswome store'
        }
    },
    components:{
        LazyImage
    }
}
</script>