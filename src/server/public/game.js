 fetch(window.location.href +'.json',{
     headers: {
         'Accept': 'application/json'
     }
 })
    .then( res => { return res.json(); })
    .then( text => {
        console.log(text);
    });


fetch('/ping', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body:JSON.stringify({
        value: 42,
    })
}).then(result => result.json())
    .then(json => console.log(json));



window.addEventListener('load', () => {
    const boardEl = document.querySelector('#board');
    const parts = ['<div class="p4-board" >'];
    for (let col =0; col <6; col++){
        parts.push(`<div class="col" data-row="${col}">`);
        for (let row =0; row <7 ; row++){
            parts.push(`<div class="cell" data-row="${row}">${col} , ${row}</div>`);
        }
        parts.push('</div>');
    }
    parts.push('</div>');
    boardEl.innerHTML = parts.join('');
});