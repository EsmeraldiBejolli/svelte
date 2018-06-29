
<h1>{headline}</h1>
<LazyImage />
<WebWorkers />
<ImmutableComponent />
<script>
import LazyImage from '../LazyImage/LazyImage.svelte';
import WebWorkers from '../WebWorkers/WebWorkers.svelte';
import ImmutableComponent from '../ImmutableComponent/ImmutableComponent.svelte';


export default {
    data() {
        return {
            headline: 'wellcome to my aswome store'
        }
    },
    components:{
        LazyImage,
        WebWorkers,
        ImmutableComponent
    }
}
</script>