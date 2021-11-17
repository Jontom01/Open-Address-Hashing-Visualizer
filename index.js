class OAHashTable{
    #tableSize;
    #table = [];
    constructor(tableSize, table){
        this.#tableSize = tableSize;
        this.#table = table;
    }
    #sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    #empty(){
        for(let i = 0; i < this.#table.length; i++){
            this.#table[i].style.backgroundColor = "rgb(255, 255, 255)"
            this.#table[i].style.border = "dashed rgb(0, 0, 0) 1px"
            this.#table[i].innerHTML = "";
        }
    }
    //HASH FUNCTIONS
    #multiplicationHash(key, flag, i){
        //0 == linear, 1 == quadratic, 2 == double hash
        let V = (Math.sqrt(5.0) - 1)/2;
        let fractionalExtract = key*V;
        let result = Math.floor(this.#tableSize*fractionalExtract);
        let check;
        if(flag == 0){
            check = (result + i) % this.#tableSize;
        } else if(flag == 1){
            check = (result + 701*i + 11*(i*i)) % this.#tableSize
        }else{
            check = (result + Math.pow((key + 11), 3)*i) % this.#tableSize;
        }
        return check;
    }
    //PROBING ALGORITHMS
    async #insertProbe(key, flag){
        let i = 0;
        let steps = 0;
        while(i < this.#tableSize){
            steps++;
            let check = this.#multiplicationHash(key, flag, i);
            if(this.#table[check].style.backgroundColor == "rgb(255, 255, 255)" && this.#table[check].innerHTML == ""){
                this.#table[check].innerHTML = key;
                this.#table[check].style.backgroundColor = "rgb(85, 214, 170)";
                this.#table[check].style.border = "solid rgb(0, 0, 0) 1px";
                break;
            }
            else{ 
                this.#table[check].style.backgroundColor = "rgb(68, 68, 68)";
                await this.#sleep(600)
                if(this.#table[check].innerHTML == ""){ 
                    this.#table[check].style.backgroundColor = "rgb(255, 255, 255)";
                }
                else{
                    this.#table[check].style.backgroundColor = "rgb(85, 214, 170)";
                }   
                i++; 
            }
        }
        try{
            if(i == this.#tableSize){
                throw "table overflow"
            }
        }
        catch(msg){ console.log(msg); }
        return steps;
    }
    async #search(key, flag){
        let i = 0;
        let steps = 0;
        while(i < this.#tableSize){
            steps++;
            let check = this.#multiplicationHash(key, flag, i);
            try{
                if(this.#table[check].innerHTML == "" && this.#table[check].backgroundColor == "rgb(255, 255, 255)"){
                    throw "value not in table";
                }
            }
            catch(msg){
                console.log(msg);
            }
            if(this.#table[check].innerHTML == key){
                this.#table[check].style.backgroundColor = "green";
                this.#table[check].style.border = "solid rgb(0, 0, 0) 1px";
                break;
            }
            else{ 
                this.#table[check].style.backgroundColor = "rgb(68, 68, 68)";
                await this.#sleep(600)
                this.#table[check].style.backgroundColor = "rgb(85, 214, 170)";
                i++; 
            }
        }
        try{
            if(i == this.#tableSize){
                throw "value not in table";
            }
        }
        catch(msg){ console.log(msg); }
        return steps;
    }
    async #insertProbeAuto(flag){
        let stepTotal = 0;
        while(!this.isFull()){
            let i = 0;
            let steps = 0;
            let key = Math.floor((Math.random() * 100) + 1);
            while(i < this.#tableSize){
                steps++;
                let check = this.#multiplicationHash(key, flag, i);
                if(this.#table[check].style.backgroundColor == "rgb(255, 255, 255)" && this.#table[check].innerHTML == ""){
                    this.#table[check].innerHTML = key;
                    this.#table[check].style.backgroundColor = "rgb(85, 214, 170)";
                    this.#table[check].style.border = "solid rgb(0, 0, 0) 1px";
                    break;
                }
                else{ 
                    this.#table[check].style.backgroundColor = "rgb(68, 68, 68)";
                    await this.#sleep(600)
                    if(this.#table[check].innerHTML == ""){ 
                        this.#table[check].style.backgroundColor = "rgb(255, 255, 255)";
                    }
                    else{
                        this.#table[check].style.backgroundColor = "rgb(85, 214, 170)";
                    }   
                    i++; 
                }
            }
            try{
                if(i == this.#tableSize){
                    throw "table overflow"
                }
            }
            catch(msg){ console.log(msg); }
            stepTotal += steps;
            await this.#sleep(600);
        }
        if(this.#tableSize == 0){
            document.getElementById("data").innerHTML += "";
        }
        else{
            document.getElementById("data").innerHTML += Math.floor((stepTotal/this.#tableSize)*100)/100;
        }
        return stepTotal;
    }
    async #insertProbeAuto100(flag){
        let stepTotal = 0;
        for(let i = 0; i < 100; i++){
            this.#empty();
            while(!this.isFull()){
                let i = 0;
                let steps = 0;
                let key = Math.floor((Math.random() * 100) + 1);
                while(i < this.#tableSize){
                    steps++;
                    let check = this.#multiplicationHash(key, flag, i);
                    if(this.#table[check].style.backgroundColor == "rgb(255, 255, 255)" && this.#table[check].innerHTML == ""){
                        this.#table[check].innerHTML = key;
                        this.#table[check].style.backgroundColor = "rgb(85, 214, 170)";
                        this.#table[check].style.border = "solid rgb(0, 0, 0) 1px";
                        break;
                    }
                    else{ 
                        this.#table[check].style.backgroundColor = "rgb(68, 68, 68)";
                        await this.#sleep(0)
                        if(this.#table[check].innerHTML == ""){ 
                            this.#table[check].style.backgroundColor = "rgb(255, 255, 255)";
                        }
                        else{
                            this.#table[check].style.backgroundColor = "rgb(85, 214, 170)";
                        }   
                        i++; 
                    }
                }
                try{
                    if(i == this.#tableSize){
                        throw "table overflow"
                    }
                }
                catch(msg){ console.log(msg); }
                stepTotal += steps;
            }
        }
        if(this.#tableSize == 0){
            document.getElementById("data").innerHTML += "";
        }
        else{
            document.getElementById("data").innerHTML += Math.floor((stepTotal/(100*this.#tableSize))*100)/100;
        }
        return stepTotal;
    }
    //PUBLIC FUNCTIONS
    tableSize(){
        return this.#tableSize;
    }
    insertLinear(key){
        return this.#insertProbe(key, 0);
    }
    insertQuadratic(key){
        return this.#insertProbe(key, 1);
    }
    insertDoubleHash(key){
        return this.#insertProbe(key, 2);
    }
    table(){
        return this.#table;
    }
    autoInsertLinearProbe(){
        return this.#insertProbeAuto(0);
    }
    autoInsertLinearProbe100(){
        return this.#insertProbeAuto100(0);
    }
    autoInsertQuadraticProbe100(){
        return this.#insertProbeAuto100(1);
    }
    autoInsertDoubleHashProbe100(){
        return this.#insertProbeAuto100(2);
    }
    autoInsertQuadraticProbe(){
        return this.#insertProbeAuto(1);
    }
    autoInsertDoubleHash(){
        return this.#insertProbeAuto(2);
    }
    linearSearch(key){
        return this.#search(key, 0);
    }
    quadraticSearch(key){
        return this.#search(key, 1);
    }
    doubleHashSearch(key){
        return this.#search(key, 2);
    }
    isFull(){
        for(let i = 0; i < this.#tableSize; i++){
            if(this.#table[i].style.backgroundColor == "rgb(255, 255, 255)"){
                return false;
            }
        }
        return true;
    }
}

//INTERACTION FUNCTIONS
let children = document.getElementById("table").getElementsByTagName("*");
function createBox(){
    if(children.length < 31){
        var boxElement = document.createElement("div");
        boxElement.style.width = "100%";
        boxElement.style.height = "15px";
        boxElement.style.display = "inline-block";
        boxElement.style.backgroundColor = "rgb(255, 255, 255)";
        boxElement.style.border = "dashed rgb(0, 0, 0) 1px"
        boxElement.style.borderRadius = "5px";
        boxElement.style.marginBottom = "1px";
        boxElement.style.fontFamily = "monospace";
        boxElement.style.fontWeight = "900";
        var table = document.getElementById("table");
        table.appendChild(boxElement);
    }
    
}
function fill(){
    while(children.length < 31){
        var boxElement = document.createElement("div");
        boxElement.style.width = "100%";
        boxElement.style.height = "15px";
        boxElement.style.display = "inline-block";
        boxElement.style.backgroundColor = "rgb(255, 255, 255)";
        boxElement.style.border = "dashed rgb(0, 0, 0) 1px"
        boxElement.style.borderRadius = "5px";
        boxElement.style.marginBottom = "1px";
        boxElement.style.fontFamily = "monospace";
        boxElement.style.fontWeight = "900";
        var table = document.getElementById("table");
        table.appendChild(boxElement);
    }
}
function linearInsert(){
    let test = new OAHashTable(children.length, children);
    let userInput = document.getElementById("input").value;
    if(userInput.length == 0){
        alert("Enter Value")
    } else {
        test.insertLinear(userInput);
    }
    document.getElementById("input").value = null;
}
function quadraticInsert(){
    let test = new OAHashTable(children.length, children);
    let userInput = document.getElementById("input").value;
    if(userInput.length == 0){
        alert("Enter Value")
    } else {
        test.insertQuadratic(userInput);
    }
    document.getElementById("input").value = null;
}
function autoLinearInsert(){
    document.getElementById("auto-btn").onclick = function(){null};
    let test = new OAHashTable(children.length, children);
    test.autoInsertLinearProbe();
    
}
function autoLinearInsert100(){
    document.getElementById("auto100-btn").onclick = function(){null};
    let test = new OAHashTable(children.length, children);
    test.autoInsertLinearProbe100();
    
}
function autoQuadraticInsert100(){
    document.getElementById("auto100-btn").onclick = function(){null};
    let test = new OAHashTable(children.length, children);
    test.autoInsertQuadraticProbe100();
    
}
function autoDoubleHashInsert100(){
    document.getElementById("auto100-btn").onclick = function(){null};
    let test = new OAHashTable(children.length, children);
    test.autoInsertDoubleHashProbe100();
    
}

async function autoQuadraticInsert(){
    document.getElementById("auto-btn").onclick = function(){null};
    let test = new OAHashTable(children.length, children);
    test.autoInsertQuadraticProbe();
}
function doubleHashInsert(){
    let test = new OAHashTable(children.length, children);
    
    let userInput = document.getElementById("input").value;
    if(userInput.length == 0){
        alert("Enter Value")
    } else {
        test.insertDoubleHash(userInput);
    }
    document.getElementById("input").value = null;
}
async function autoDoubleHashInsert(){
    document.getElementById("auto-btn").onclick = function(){null};
    let test = new OAHashTable(children.length, children);
    test.autoInsertDoubleHash();
}
function quadraticReset(){
    reset();
    document.getElementById("data").innerHTML = `QUADRATIC PROBING<br><br>HASH FUNCTION:<br>
    #multiplicationHash(key){<br>
        &nbsplet V = (Math.sqrt(5.0) - 1)/2;<br>
        &nbsplet fractionalExtract = key*V;<br>
        &nbsplet result = Math.floor(this.#tableSize*fractionalExtract);<br>
        &nbspreturn result;<br>
    }<br><br><br> Multipliers: c1 = 9323, c2 = 9679<br><br><br>AVERAGE STEPS:`;
    document.getElementById("insert-btn").onclick = function(){quadraticInsert()};
    document.getElementById("search-btn").onclick = function(){_quadraticSearch()};
    document.getElementById("auto100-btn").onclick = function(){autoQuadraticInsert100()};
    document.getElementById("auto-btn").onclick = function(){autoQuadraticInsert()};
    document.getElementById("reset-btn").onclick = function(){quadraticReset()};
}
function linearReset(){
    reset();
    document.getElementById("data").innerHTML = `LINEAR PROBING<br><br>HASH FUNCTION:<br>
    #multiplicationHash(key){<br>
        &nbsplet V = (Math.sqrt(5.0) - 1)/2;<br>
        &nbsplet fractionalExtract = key*V;<br>
        &nbsplet result = Math.floor(this.#tableSize*fractionalExtract);<br>
        &nbspreturn result;<br>
    }<br><br><br>
    AVERAGE STEPS:`;
    document.getElementById("insert-btn").onclick = function(){linearInsert()};
    document.getElementById("search-btn").onclick = function(){_linearSearch()};
    document.getElementById("auto100-btn").onclick = function(){autoLinearInsert100()};
    document.getElementById("auto-btn").onclick = function(){autoLinearInsert()};
    document.getElementById("reset-btn").onclick = function(){linearReset()};
}
function doubleHashReset(){
    reset();
    document.getElementById("data").innerHTML = `DOUBLE HASHING<br><br>HASH FUNCTION:<br>
    #multiplicationHash(key){<br>
        &nbsplet V = (Math.sqrt(5.0) - 1)/2;<br>
        &nbsplet fractionalExtract = key*V;<br>
        &nbsplet result = Math.floor(this.#tableSize*fractionalExtract);<br>
        &nbspreturn result;<br>
    }<br><br><br>
    h'(k) = multiplicationHash(key)<br>
    h''(k) = (key + 11)^3<br><br><br>
    AVERAGE STEPS:`;
    document.getElementById("insert-btn").onclick = function(){doubleHashInsert()};
    document.getElementById("search-btn").onclick = function(){_doubleHashSearch()};
    document.getElementById("auto100-btn").onclick = function(){autoDoubleHashInsert100()};
    document.getElementById("auto-btn").onclick = function(){autoDoubleHashInsert()};
    document.getElementById("reset-btn").onclick = function(){doubleHashReset()};
}
function _linearSearch(){
    let test = new OAHashTable(children.length, children);
    let userInput = document.getElementById("input").value;
    if(userInput.length == 0){
        alert("Enter Value")
    } else {
        test.linearSearch(userInput);
    }
    document.getElementById("input").value = null;
}
function _quadraticSearch(){
    let test = new OAHashTable(children.length, children);
    let userInput = document.getElementById("input").value;
    if(userInput.length == 0){
        alert("Enter Value")
    } else {
        test.quadraticSearch(userInput);
    }
    document.getElementById("input").value = null;
}
function _doubleHashSearch(){
    let test = new OAHashTable(children.length, children);
    let userInput = document.getElementById("input").value;
    if(userInput.length == 0){
        alert("Enter Value")
    } else {
        test.doubleHashSearch(userInput);
    }
    document.getElementById("input").value = null;
}
function reset(){
    let myNode = document.getElementById("table");
    while(myNode.firstChild){
        myNode.removeChild(myNode.lastChild);
    }
}
async function loopChildren(){
    console.log(children);
    
    for(i = 0;i < children.length; i++){
        children[i].style.backgroundColor = "rgb(85, 214, 170)";
        await sleep(100);
        children[i].style.backgroundColor = 'rgb(255, 255, 255)';
    }
    
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}