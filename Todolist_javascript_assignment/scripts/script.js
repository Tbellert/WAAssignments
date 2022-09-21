import {deleteData, getData, postData, putData} from "./api_client.js"

const list = document.querySelector(".tasklist");
const clearAllBtn = document.getElementById("clearlist");

// Get the data from the API
const awaitData = async function(){
    const newArray = await getData();
    return newArray;
};

// Put List Items in DOM
const putDataInDom = async function(){
    const ArrayWithData = await awaitData();
    ArrayWithData.forEach((element) => {
        const newChild = document.createElement("li");
        newChild.id = element._id;
        newChild.className = "tasklist_listitem";
        // span to put textnode in
        const textSpan = document.createElement("span");
        const textNode = document.createTextNode(element.description);
        textSpan.className = "tasklist_listitem_text"
        textSpan.append(textNode);
        // input to check
        const check = document.createElement("input");
        check.className = "tasklist_listitem_check";
        check.type = "checkbox"
        // btn to delete li
        const close = document.createElement("span");
        close.className = "fa-solid fa-trash";
        // append it to li, then to ul
        newChild.append(check);
        newChild.append(textSpan);
        newChild.append(close);
        list.append(newChild);
    });
};

putDataInDom();

// Clear List
const clearUL = function(){
    return list.innerHTML = "";
};

// Input new task on clicking add button
const btnNewTask = document.getElementById("newtask");
btnNewTask.addEventListener("click", function(){
    const textBar = document.getElementById("input").value;
    if (textBar !== "") {
        postData(textBar);
        clearUL();
        putDataInDom();
        document.getElementById("input").value = "";
    } else {
        return alert("Please enter a description!");
    };
});

// Input new task on keydown, because we all love tapping enter.
document.addEventListener("keydown", function(e){
    const textBar = document.getElementById("input").value;
    if (e.keyCode === 13) {
        if (textBar !== "") {
            postData(textBar);
            clearUL();
            putDataInDom();
            document.getElementById("input").value = "";
        } else {
            return alert("Please enter a description!");
        }; 
    };
});

// Delete a task
document.getElementById("tasklist").addEventListener('click', function(e){
    if(e.target && e.target.className == "fa-solid fa-trash"){
          const listItemId = e.target.parentNode.id;
          deleteData(listItemId).then(() => {
            clearUL();
            putDataInDom();
          });
    };
});

// Delete all tasks, because it's silly to delete them one by one.
clearAllBtn.addEventListener("click", async function(){
    const array = await awaitData();
    array.map(element => element._id).forEach((element) => {
        deleteData(element);
        clearUL();
    });
});
 
// Edit a task
document.getElementById("tasklist").addEventListener('click',function(e){
    if(e.target && e.target.className == "tasklist_listitem_text"){
        const li = e.target.parentNode;
        const id = li.id;
        const text = li.innerText;
        // create new textfield
        const newInput = document.createElement("input");
        newInput.id = "newinput";
        newInput.className = "tasklist_listitem_textinput"
        newInput.type = "text";
        newInput.placeholder = text;
        // create btn to edit
        const editBtn = document.createElement("button");
        editBtn.id = "edit"
        editBtn.className = "tasklist_listitem_edit"
        editBtn.value = "edit"
        editBtn.innerText = "Edit"
        // create btn to close and return
        const closeBtn = document.createElement("button");
        closeBtn.id = "close"
        closeBtn.className = "tasklist_listitem_close"
        closeBtn.value = "close"
        closeBtn.innerText = "Close"
        // clear content of li
        li.innerText = "";
        // fill up the li
        li.append(newInput);
        li.append(editBtn);
        li.append(closeBtn);
        // when editbtn is pressed send PUT request
        editBtn.addEventListener("click", function(){
            const newText = document.getElementById("newinput").value;
            if (newText !== "") {
                putData(newText, id);
                clearUL();
                putDataInDom();
            } else {
                return alert("The edit has no value! Please give a value");
            };
        });
        // When closebtn is pressed return to "home"
        closeBtn.addEventListener("click", function(){
            clearUL();
            putDataInDom();
        });
    };
});

// Line-through text on clicking checkbox
list.addEventListener('click', function(e) {
  if (e.target.tagName === "INPUT") {
    const text = e.target.parentNode.childNodes[1];
    text.classList.toggle("checked");
  };
}, false);