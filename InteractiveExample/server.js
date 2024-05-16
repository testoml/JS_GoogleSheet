
const output = document.querySelector('.output');
const button = document.getElementById('request');
const btnImagen = document.querySelector('.btnImagen');
const url = "https://docs.google.com/spreadsheets/d/";
const ssid = document.querySelector('.mySheet').value;
const query1 = `/gviz/tq?`; //visualization data
const query2 = 'tqx=out:json';
const sheetsOptions = document.querySelector('.sheets')
const query = document.querySelector('.myQuery')


const select = `select *`
const query4 = encodeURIComponent(select);


button.addEventListener('click', getData);
btnImagen.addEventListener('click', showAllProducts);

function GetEndpoint(){
    var endpoint = `${url}${ssid}${query1}&${query2}`;
    const valueSheet = sheetsOptions.value
    const valueQuery = query.value;
    console.log(valueSheet)
    if(valueSheet !== ""){
        endpoint = endpoint.concat(`&sheet=${valueSheet}`);
    }
    if(valueQuery!=""){
        endpoint = endpoint.concat(`&tq=${valueQuery}`);
    }
    output.innerHTML = endpoint;
    return endpoint
}

function getJson(endpoint){
var json;
fetch(endpoint)
.then(res => res.text())
.then(data => {
    const temp = data.substring(47).slice(0, -2); 
    json = JSON.parse(temp);
});
return json;
}

function getData(){
output.innerHTML = document.createElement('div');
const  path = GetEndpoint();
console.log(path)
fetch(path)
.then(res => res.text())
.then(data => {
    const temp = data.substring(47).slice(0, -2); 
    const json = JSON.parse(temp);
    const heading = makeCell(output, '', 'heading');//first row
    json.table.cols.forEach((col) => {
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
}



function showImagen(){
 //https://drive.google.com/thumbnail?id=1kcjW6G-wqXZSl2ngQ27GWTCLD7lAg-9C
  const query = `select I where I is not null`
  const endpoint  =  `${url}${ssid}${query1}&${query2}&sheet=Test4&tq=${query}`;
  console.log(endpoint);
  fetch(endpoint)
  .then(res => res.text())
  .then(data => {
      const temp = data.substring(47).slice(0, -2); 
      const json = JSON.parse(temp);
      json.table.rows.forEach((row) => {
          row.c.forEach((cell)=>{
              const url = cell.v;
              const firstPart = url.split('/d/')[1];
              const id = firstPart.split("/")[0];
               
              output.insertAdjacentHTML('beforeend', `
              <label></label>
              <img width="25%" height="350" src="https://drive.google.com/thumbnail?id=${id}" role="img"><rect width="100%" height="100%" fill="#55595c"/></img>`);                             
          });
      });
  }); 
}

function showImagenes(){
    //https://drive.google.com/thumbnail?id=1kcjW6G-wqXZSl2ngQ27GWTCLD7lAg-9C
     var select = `select I where I is not null`
     const query4 = encodeURIComponent(select);
     var endpoint  =  `${url}${ssid}${query1}&${query2}&sheet=Test4&tq=${query4}`;
     fetch(endpoint)
     .then(res => res.text())
     .then(data => {
         const temp = data.substring(47).slice(0, -2); 
         const json = JSON.parse(temp);
         json.table.rows.forEach((row) => {
             row.c.forEach((cell)=>{
                 const url = cell.v;
                 const firstPart = url.split('/d/')[1];
                 const id = firstPart.split("/")[0];
                 const div= makeCell(output, '', 'box')
                 div.insertAdjacentHTML('beforeend', `
                 <img width="100%" height="350" src="https://drive.google.com/thumbnail?id=${id}" role="img"><rect width="100%" height="100%" fill="#55595c"/></img>`);                             
             });
         });
     });  
   }

   function showProducts(){
     setTimeout(function(){}, 1000)
    //https://drive.google.com/thumbnail?id=1kcjW6G-wqXZSl2ngQ27GWTCLD7lAg-9C
     var select = `select A where I is not null`
     const query4 = encodeURIComponent(select);
     var endpoint  =  `${url}${ssid}${query1}&${query2}&sheet=Test4&tq=${query4}`;
     fetch(endpoint)
     .then(res => res.text())
     .then(data => {
         const temp = data.substring(47).slice(0, -2); 
         const json = JSON.parse(temp);
         const cellTemp = [];
         const box = document.querySelectorAll('.box');
         json.table.rows.forEach((row) => {
            row.c.forEach((cell)=>{
                 cellTemp.push(JSON.stringify(cell.v))                       
            });
        });      
        for (let i = 0; i < box.length; i++) {
                console.log(cellTemp[i])
                box[i].insertAdjacentHTML('beforeend', `<label>${cellTemp[i]}</label>`);  
         }    
     });  
   }

   function showInformationAfterImagen(select, tag){
    setTimeout(function(){}, 3000)
   //https://drive.google.com/thumbnail?id=1kcjW6G-wqXZSl2ngQ27GWTCLD7lAg-9C
    //var select = `select A where I is not null`
    const query4 = encodeURIComponent(select);
    var endpoint  =  `${url}${ssid}${query1}&${query2}&sheet=Test4&tq=${query4}`;
    fetch(endpoint)
    .then(res => res.text())
    .then(data => {
        const temp = data.substring(47).slice(0, -2); 
        const json = JSON.parse(temp);
        const cellTemp = [];
        const box = document.querySelectorAll('.box');
        json.table.rows.forEach((row) => {
           row.c.forEach((cell)=>{
                cellTemp.push(JSON.stringify(cell.v))                       
           });
       });      
       for (let i = 0; i < box.length; i++) {
               if(tag != ""){
                box[i].insertAdjacentHTML('beforeend', `<br><label>${tag}: ${cellTemp[i]}</label>`);  
               } else {
                box[i].insertAdjacentHTML('beforeend', `<br><label>${cellTemp[i]}</label>`);  
               }
               
               //box[i].insertAdjacentHTML('beforeend', `${element}`); 
        }    
    });  
   }

   function showAllProducts(){
    const where = ` where I is not null and F != 'No disponible'`
    showImagenes();
    showInformationAfterImagen(`select A ${where}`, "")
    showInformationAfterImagen(`select C ${where}`, "Precio")
    showInformationAfterImagen(`select D ${where}`, "Precio Sugerido 1")
    showInformationAfterImagen(`select E ${where}`, "Precio Sugerido 2")
    showInformationAfterImagen(`select F ${where}`, "")
   }

function makeCell(parent, html, classAdd){
 const ele = document.createElement('div');
 parent.append(ele); //create element to the parent
 ele.innerHTML = html;
 ele.classList.add(classAdd);
 return ele;
}

