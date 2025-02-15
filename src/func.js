import positive from "../assets/plus.svg"

const groups = [];
const mainTasks = [];

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
        const toDos = document.querySelector(".todos");
        toDos.textContent = "Seems you are free now. Add some tasks";
        this.inpCall.addEventListener("click", () => {
            this.field.style.display = "flex";
        });
        this.inputing.img.addEventListener("click", () => {
            this.field.style.display = "none";
            this.inputing.input.value = "";
        });
        this.inputing.button.addEventListener("click", () => {
            if (!this.inputing.input.value) return;
            this.new = DOMinate.DOMNavEdit(this.inputing.input.value);
            groups.push(this.new);
            mainTasks.push(DOMinate.DOMToDoEdit(this.inputing.input.value, this.new.element.classList));
            console.log(groups);
            console.log(mainTasks);
            this.inputing.input.value = "";
            this.field.style.display = "none";
        })
    })()

    static giveClass(ul, value, place) {
        let check = false;
        let num = "";
        place.forEach(el => {
            if(value == el.element.classList) {
                check = true
            }
        });
        if (check) {
            num = Math.round(Math.random() * 56);
        }
        ul.classList = value + num;
    }
}

class DOMinate {
    toDo = document.querySelector(".todos");
    customProj = document.querySelector(".custom");

    static DOMNavEdit(value) {
        const customProj = document.querySelector(".custom");
        const newGroup = document.createElement("ul");
        const para = document.createElement("p");
        para.textContent = value;
        main.giveClass(newGroup, value, groups);
        newGroup.appendChild(para);
        customProj.appendChild(newGroup);
        return {title: para, element: newGroup};
    }

    static DOMToDoEdit(text, value) {
        const toDo = document.querySelector(".todos");
        const para = document.createElement("p");
        toDo.textContent = "";
        para.textContent = text;
        const tasks = document.createElement("ul");
        const task = document.createElement("li");
        const img = document.createElement("img");
        tasks.classList = value;
        img.src = positive;
        img.alt = "positive";
        toDo.appendChild(para);
        toDo.appendChild(tasks);
        tasks.appendChild(task);
        task.appendChild(img);
        task.appendChild(document.createTextNode("Add task"));
        task.addEventListener("click", (e) => {
            this.pushed = e.target;
            DOMinate.CallInput();
        });
        return {title: para, parent: tasks, lastChild: task, amount: 0};
    }

    static CallInput() {
        const calledInput = document.querySelector(".f1");
        const button = document.querySelector(".f1 .apply");
        const img = document.querySelector(".f1 > .inputField.card > img");

        calledInput.style.display = "flex";

        img.addEventListener("click", () => {
            remove();
        });
        button.addEventListener("click", () => {
            const inputText = document.querySelector(".f1 > .inputField.card > label > input");
            const timeInput = document.querySelectorAll(".timeInput > *");
            if(!inputText.value || !timeInput[0].value || !timeInput[1].value) return;
            DOMinate.taskCreator(inputText.value, timeInput[0].value, timeInput[1].value);
            remove();
        });

        function remove() {
            document.querySelector(".f1 > .inputField.card > label > input").value = "";
            [...document.querySelectorAll(".timeInput > *")].forEach(el => {
                el.value = "";
            });
            document.querySelector(".impInp > label input").checked = true;
            calledInput.style.display = "none";
        }
    }

    static taskCreator(tittle, hourBased, monthBased) {
        let nums;
        const children = this.pushed;
        const parent = children.parentNode;
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const impInput = document.querySelector(".impInp > label input:checked");
        const li = document.createElement("li");
        const date = new Date(monthBased);
        const input = document.createElement("input");
        const div = document.createElement("div");
        const para1 = document.createElement("p");
        const para2 = document.createElement("p");
        mainTasks.forEach(e => {
            e.parent.classList == parent.classList ? nums = mainTasks.indexOf(e) : console.log("uwi");
        })
        const count = "td" + mainTasks[nums].amount;

        para1.textContent = tittle;
        para2.textContent = `${hourBased} ${daysOfWeek[date.getDay()]}`;
        para2.classList = "timeManage";

        if (impInput.classList == "mid") {
            input.classList = "medium";
        } else if (impInput.classList == "imp") {
            input.classList = "important";
        };

        input.type = "checkbox";
        input.id = count;
        div.classList = count;

        li.appendChild(input);
        li.appendChild(div);
        div.appendChild(para1);
        div.appendChild(para2);

        parent.insertBefore(li, children);
        mainTasks[nums].amount += 1;
    }
}

export {main};