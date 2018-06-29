<section class="play-web-workers">
    <h1>{sample}</h1>
</section>

<script>
    import { Map } from 'immutable';

    export default {
        data() {
            return {
               sample: 'sample data from web workers'
            };
        },
        oncreate() {
            let puntori = new Worker('/workers/puntori.js');
            
            puntori.postMessage({
                job: 'calculate'
            });

            puntori.addEventListener('message', (event) => {
                console.log(event.data);
            });

            const map = Map({ a:1, b:2 });
            console.log(map.get('a'))
        }
    };
</script>
