
const output = document.querySelector('.output');
const url = "https://docs.google.com/spreadsheets/d/"
const ssid = "16zTfHycTC8aK7Ng_kPswvcXQzwqE8B-akA275zsfAwQ";
const query1 = `/gviz/tq?`; //visualization data
const query2 = 'tqx=out:json';
const query3 = 'sheet=Test3';

const select = `select A,B where B='Eng'`
const query4 = encodeURIComponent(select);

const endpoint1 = `${url}${ssid}${query1}&${query2}&${query3}&tq=${query4}`;
output.innerHTML = endpoint1;

fetch(endpoint1)
.then(res => res.text())
.then(data => {
    const temp = data.substring(47).slice(0, -2); 
    const json = JSON.parse(temp);
    const heading = makeCell(output, '', 'heading');//first row
    json.table.cols.forEach((col) => {
         console.log(col);
         const el = makeCell(heading, col.id, 'box')
    });
    json.table.rows.forEach((row) => {
        const div = makeCell(output, '', 'row');
        console.log(row);
        row.c.forEach((cell)=>{
            const ele1 = makeCell(div, `${cell.v}` , 'box')      
        });
    });
});


function makeCell(parent, html, classAdd){
 const ele = document.createElement('div');
 parent.append(ele); //create element to the parent
 ele.innerHTML = html;
 ele.classList.add(classAdd);
 return ele;

}
