
onmessage = (event) => {
    let message = event.data.job;
    let aldi = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('I was resolved after 10s in jail of scope.')
        },10000);
    })
    if(message === 'calculate') {
        aldi.then(res => postMessage(res));
    }
}