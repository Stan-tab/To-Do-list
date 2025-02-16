import positive from "../assets/plus.svg"

const toJson = [];
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
        button1: document.querySelector(".f1 .apply"),
        img1: document.querySelector(".f1 > .inputField.card > img"),
    }

    inpCall = document.querySelector(".addGroup");
    field = document.querySelector(".f2");
    calledInput = document.querySelector(".f1");

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
            const not = [":", ";", "'", "\"", "\\", "|", "&"];
            if (!this.inputing.input.value || not.some(el => this.inputing.input.value.includes(el))) return;
            this.navObjs = DOMinate.DOMNavEdit(this.inputing.input.value);
            this.toDoObj = DOMinate.DOMToDoEdit(this.inputing.input.value, this.navObjs.element.classList);

            mainTasks.push(this.toDoObj);
            console.log(mainTasks);
            this.inputing.input.value = "";
            this.field.style.display = "none";

            this.toDoObj.lastChild.addEventListener("click", (e) => {
                this.calledInput.style.display = "flex";
                e.target.nodeName == "IMG" ? this.pushed = e.target.parentNode : this.pushed = e.target;
            })
        });

        this.inputing.button1.addEventListener("click", () => {
            const inputText = document.querySelector(".f1 > .inputField.card > label > input");
            const timeInput = document.querySelectorAll(".timeInput > *");
            if(!inputText.value || !timeInput[0].value || !timeInput[1].value) return;
            DOMinate.taskCreator(inputText.value, timeInput[0].value, timeInput[1].value, this.pushed);
            this.remove()
        });
        this.inputing.img1.addEventListener("click", () => {
            this.remove();
        })
    })()

    remove() {
        document.querySelector(".f1 > .inputField.card > label > input").value = "";
        [...document.querySelectorAll(".timeInput > *")].forEach(el => {
            el.value = "";
        });
        document.querySelector(".impInp > label input").checked = true;
        this.calledInput.style.display = "none";
    };


    static giveClass(ul, value, place) {
        let check = false;
        let num = "";
        place.forEach(el => {
            if(value == el.parent.classList) check = true;
        });
        if (check) num = Math.round(Math.random() * 56);
        ul.classList = `${value}${num}`;
    }

    static separator(hourTime, monthTime) {
        hourTime = hourTime.split(":");
        monthTime = monthTime.split("-");
        return {hourTime, monthTime};
    }

    static jsonize(n) {
        console.log(mainTasks[n].title)
    }
}



class DOMinate {
    static DOMNavEdit(value) {
        const customProj = document.querySelector(".custom");
        const newGroup = document.createElement("ul");
        const para = document.createElement("p");
        para.textContent = value;
        main.giveClass(newGroup, value, mainTasks);
        newGroup.appendChild(para);
        customProj.appendChild(newGroup);
        return {title: para, element: newGroup};
    }

    static DOMToDoEdit(text, value) {
        const toDo = document.querySelector(".todos");
        const para = document.createElement("p");
        if(toDo.textContent == "Seems you are free now. Add some tasks") toDo.textContent = "";
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
        return {title: para, parent: tasks, lastChild: task, amount: 0, childs:[]};
    }

    static taskCreator(tittle, hourBased, monthBased, children) {
        let nums;
        const parent = children.parentNode;
        const time = main.separator(hourBased, monthBased);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const impInput = document.querySelector(".impInp > label input:checked");
        const li = document.createElement("li");
        const date = new Date(time.monthTime[0], time.monthTime[1], time.monthTime[2], time.hourTime[0], time.hourTime[1]);
        const input = document.createElement("input");
        const div = document.createElement("div");
        const para1 = document.createElement("p");
        const para2 = document.createElement("p");
        mainTasks.forEach(e => {
            e.parent.classList == parent.classList ? nums = mainTasks.indexOf(e) : console.log("uwi");
        })
        const count = "td" + mainTasks[nums].amount;
        const navLi = document.createElement("li");
        navLi.textContent = tittle;
        navLi.classList = count;
        const nav = document.querySelector(`nav .${parent.classList}`);
        nav.appendChild(navLi);

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
        mainTasks[nums].childs.push({name: tittle, date: date, importance: input.classList, id: input.id, checked: false});

        main.jsonize(nums);
    }
}

export {main};