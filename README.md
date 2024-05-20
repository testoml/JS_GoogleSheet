# JS and GoogleSheet

[Documentation](https://docs.google.com/document/d/1aHjIayjpoDQ2hf0own0sieRU10ef0VB4LY2BIi2bnkQ/edit#heading=h.b740kmgvh84w)

### Set project
Create a new project and add two files 
- index.html
- api.js

### Excel file
1. Create an Excel file in Google with information that you consider important for example: 

|1            | A                                                             |
| ----------------- | ------------------------------------------------------------------ |
| 2 | B |
| 3 | C |
| 4 | D |
| 5 | E |

2. Go to Share option and set the document as public choose the option as “Anyone with the link” and copy the link (Try to test that the link is working correctly )

### api.js
```js
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
```

### index.html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box{
            display: inline-block;
            width: 25%;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Google Sheet as JSON</h1>
    <div class="output"></div>
    <script src="./src/index.js"></script>
</body>
</html>
```

### Working with Heading and sheets
- In the Excel file that you created previously add a new sheet and add information
### api.js
```js
const output = document.querySelector('.output');
const url = "https://docs.google.com/spreadsheets/d/"
const ssid = "16zTfHycTC8aK7Ng_kPswvcXQzwqE8B-akA275zsfAwQ";
const query1 = `/gviz/tq?`; //visualization data
const query2 = "tqx=out:json";
const query3 = 'sheet=Test2'

const endpoint1 = `${url}${ssid}${query1}&${query2}&${query3}`;
//output.innerHTML = endpoint1;

fetch(endpoint1)
.then(res => res.text())
.then(data => {
    const temp = data.substring(47).slice(0, -2); 
    const json = JSON.parse(temp);
    const heading = makeCell(output, '', 'heading');//first row
    json.table.cols.forEach((col) => {
         //console.log(col);
         const el = makeCell(heading, col.label, 'box')
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
```
### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box{
            display: inline-block;
            width: 15%;
            text-align: center;
        }
        .heading{
            font-size: 1.2em;
            color:white;
            background-color: black;
        }
        .row{
            
        }
        
    </style>
</head>
<body>
    <h1>Google Sheet as JSON</h1>
    <div class="output"></div>
    <script src="./api.js"></script>
</body>
</html>
```

## Query Language
You can check the [Documentation](https://developers.google.com/chart/interactive/docs/querylanguage)

- If you don't have any example and you still using the previous Excel file add a new sheet with the information table provided by documentation link. 

### Encode
```js
const select = `select A,B where B='Eng'` //In documentation page you can find more examples.
const query4 = encodeURIComponent(select);

const endpoint1 = `${url}${ssid}${query1}&${query2}&${query3}&tq=${query4}`;
output.innerHTML = endpoint1;

``` 
