# JS and GoogleSheet

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