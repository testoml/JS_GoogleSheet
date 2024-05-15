
const output = document.querySelector('.output');
const url = "https://docs.google.com/spreadsheets/d/"
const ssid = "16zTfHycTC8aK7Ng_kPswvcXQzwqE8B-akA275zsfAwQ";
const query1 = `/gviz/tq?`;

const endpoint1 = `${url}${ssid}${query1}`;
//output.textContent = endpoint1;

fetch(endpoint1)
.then(res => res.text())
.then(data => {
    const temp = data.substring(47).slice(0, -2)
    //console.log(temp);
    //format as JSON
    const json = JSON.parse(temp);
    const rows = json.table.rows
    //console.log(rows);
    rows.forEach((row) => {
        const div = document.createElement('div');
        const temp1 = row.c;
        temp1.forEach((cell)=>{
            //console.log(cell);
            //show in div
            const box = document.createElement('div');
            box.textContent = cell.v;
            box.classList.add('box');
            div.append(box);
        });
        output.append(div);
    });
});
