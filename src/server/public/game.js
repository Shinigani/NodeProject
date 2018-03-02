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

    const boardEl = document.getElementById('board');
    const parts = ['<div class="p4-board" ><table>'];

    for (let col = 0; col < 6; col++){
        parts.push(`<tr>${col}`);
        for (let row =0; row <7 ; row++){
            parts.push(`<td id="row-puissance" data-col="${col}-${row}"></td>`);
        }
        parts.push(`</tr>`);
    }
    parts.push(`</tr></table></div>`);
    boardEl.innerHTML = parts.join('');
});

window.onload = function () {
    document.getElementById('row-puissance').addEventListener("click", handleClickOnCase, false);
}

 function handleClickOnCase(event) {
         if (event.target.className === "row-puissance") {
             var colId = -	1;
             if (colId = event.target.getAttribute('data-colonne')) {
                 console.log('case clicker');
             }
         }

 }
// eric@rixo.fr