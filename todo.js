let tasks = document.querySelector('.tasks');
let input = document.querySelector('.input-sec input');
let add = document.querySelector('.add');
let del = document.querySelector('.delete');

let arr = [];

if(localStorage.getItem('tasks')){
    arr = JSON.parse(localStorage.getItem("tasks"));
    addHtmlElement(arr);
}

add.onclick = function(){
    if (input.value !== "") {
        taskToArr(input.value);
        input.value = "";
    }
}

function taskToArr(text){
    const task = {
        id : Date.now() ,
        value : text
    };
    arr.push(task);
    console.log(arr);
    addHtmlElement(arr);
    toLocalStorage(arr);
}

function addHtmlElement(arr){
    tasks.innerHTML = '';
    arr.forEach(ele =>{
        // tasks.innerHTML = '';
        let task_div = document.createElement('div');
            task_div.className = 'task';
            task_div.setAttribute('data-id' , ele.id);
            let span = document.createElement('span');
            span.appendChild(document.createTextNode(ele.value));
            span.className ='span';
            let del = document.createElement('button');
            del.appendChild(document.createTextNode('Delete'));
            del.className = 'delete';
            task_div.appendChild(span);
            task_div.appendChild(del);
            tasks.appendChild(task_div);
    });
}

// set to localStorage
function toLocalStorage(arr){
    window.localStorage.setItem('tasks' , JSON.stringify(arr));
}


tasks.addEventListener('click' , function(e){
    if(e.target.className =='delete'){
        // remove from page
        e.target.parentElement.remove();

        // remove from localstorage
        let d = e.target.parentElement.getAttribute('data-id');
        arr = arr.filter(ele =>{
            return ele.id != d;
        });
        toLocalStorage(arr);
    }
    console.log(e.target.className == 'span')
    if(e.target.className == 'span'){
        e.target.classList.add('done');
    }

})