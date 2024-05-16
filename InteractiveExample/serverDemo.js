
const output = document.querySelector('.output');
const url = "https://docs.google.com/spreadsheets/d/"
const ssid = "16zTfHycTC8aK7Ng_kPswvcXQzwqE8B-akA275zsfAwQ";
const query1 = `/gviz/tq?`; //visualization data
const query2 = 'tqx=out:json';
const query3 = 'sheet=Test4';

const select = `select A, C, F, I where I is not null and F != 'No disponible'`
const query4 = encodeURIComponent(select);

const endpoint1 = `${url}${ssid}${query1}&${query2}&${query3}&tq=${query4}`;
//output.innerHTML = endpoint1;


fetch(endpoint1)
.then(res => res.text())
.then(data => {
    const temp = data.substring(47).slice(0, -2); 
    const json = JSON.parse(temp);
    const products = []
    var listProducts = []
    json.table.rows.forEach((row) => {
        /*console.log("Producto: " + JSON.stringify(row.c[0]));
        console.log("Precio: " + JSON.stringify(row.c[1]));
        console.log("Informacion: " + JSON.stringify(row.c[2]));
        console.log("Link: " + JSON.stringify(row.c[3]));*/
        products.push(row.c)
        
    });
    console.log(products.length)
    console.log(products[0].length)
    for (let i = 0; i < products.length; i++) {
        let product = {}
        product.name = products[i][0]
        product.precio = products[i][1]
        product.information = products[i][2]
        product.link = products[i][3]
        listProducts.push(product)   
    }
    listProducts.forEach((prod)=>{
        const ele1 = makeCell(output, `${prod.information.v}` , 'box');
        const ele2 = makeCell(ele1, `${prod.name.v}`, 'name')
        const ele3 = makeCell(ele2, `${prod.precio.f}`, 'precio')
        const url = prod.link.v;
        const firstPart = url.split('/d/')[1];
        const id = firstPart.split("/")[0];
        ele3.insertAdjacentHTML('beforeend', `
        <img width="90%" height="350" src="https://drive.google.com/thumbnail?id=${id}" role="img"><rect width="100%" height="100%" fill="#55595c"/></img>`); 
    })
});


function makeCell(parent, html, classAdd){
 const ele = document.createElement('div');
 parent.append(ele); //create element to the parent
 ele.innerHTML = html;
 ele.classList.add(classAdd);
 return ele;

}
