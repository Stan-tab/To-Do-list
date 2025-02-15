import positive from "../assets/plus.svg"

const groups = [];
const tasks = [];

class main{
    changable = {
        compl: document.querySelector(".completed"),
        today: document.querySelector(".today"),
        compl: document.querySelector(".future"),
    };
    inputing = {
        input: document.querySelector(".f2 input"),
        img: document.querySelector(".f2 img"),
        button: document.querySelector(".f2 button"),
    }

    inpCall = document.querySelector(".addGroup");
    field = document.querySelector(".f2");

    addListeners = (() => {
        this.inpCall.addEventListener("click", () => {
            this.field.style.display = "flex";
        });
        this.inputing.img.addEventListener("click", () => {
            this.field.style.display = "none";
            this.inputing.input.value = "";
        });
        this.inputing.button.addEventListener("click", () => {
            if (!this.inputing.input.value) return;
            groups.push(DOMinate.DOMNavEdit(this.inputing.input.value));
            console.log(groups);
            DOMinate.DOMToDoEdit(this.inputing.input.value);
            this.inputing.input.value = "";
            this.field.style.display = "none";
        })
    })()
}

class DOMinate {
    toDo = document.querySelector(".todos");
    customProj = document.querySelector(".custom");

    static DOMNavEdit(value) {
        const customProj = document.querySelector(".custom");
        const newGroup = document.createElement("ul");
        const para = document.createElement("p");
        para.textContent = value;
        newGroup.appendChild(para);
        customProj.appendChild(newGroup);
        return {name: para.textContent, element: newGroup, title: para};
    }

    static DOMToDoEdit(value) {
        const toDo = document.querySelector(".todos");
        const para = document.createElement("p");
        para.textContent = value;
        const tasks = document.createElement("ul");
        const task = document.createElement("li");
        const img = document.createElement("img");
        img.src = positive;
        img.alt = "positive";
        toDo.appendChild(para);
        toDo.appendChild(tasks);
        tasks.appendChild(task);
        task.appendChild(img);
        task.appendChild(document.createTextNode("Add task"));
    }
}

export {main};