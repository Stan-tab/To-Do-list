import positive from "../assets/plus.svg"

const toJson = [];
const mainTasks = [];

class main{
    today = new Date();

    count = 0;
    changable = {
        compl: document.querySelector(".completed"),
        today: document.querySelector(".today"),
        all: document.querySelector(".all"),
    };
    inputing = {
        input: document.querySelector(".f2 input"),
        img: document.querySelector(".f2 img"),
        button: document.querySelector(".f2 button"),
        button1: document.querySelector(".f1 .apply"),
        img1: document.querySelector(".f1 > .inputField.card > img"),
        sortImg: document.querySelector("header > img"),
    }

    inpCall = document.querySelector(".addGroup");
    field = document.querySelector(".f2");
    calledInput = document.querySelector(".f1");

    recognize = (() => {
        if (!localStorage.getItem("data")) return;
        const data = JSON.parse(localStorage.getItem("data"));
        data.forEach(e => {
            const navVal = DOMinate.DOMNavEdit(e.tittle);
            const toDoObj = DOMinate.DOMToDoEdit(e.tittle, navVal.element.classList[0]);

            toJson.push({tittle: toDoObj.tittle.textContent, childs: []});
            mainTasks.push({tittle: toDoObj.tittle, parent: toDoObj.parent, lastChild: toDoObj.lastChild, childs: toDoObj.childs});
        });
        data.forEach(e => {
            if(e.childs==0) return;
            e.childs.forEach(el => {
                const toDoTask = DOMinate.taskToDo(el.name, new Date(el.date), mainTasks[data.indexOf(e)].lastChild, el.importance, "", "", el.checked);
                DOMinate.taskNav(el.name, mainTasks[data.indexOf(e)].lastChild, toDoTask.class);
                toDoTask.child.childClass = toDoTask.class;
                mainTasks[data.indexOf(e)].childs.push(toDoTask.child);
                toJson[data.indexOf(e)].childs.push({name: toDoTask.child.name,
                                               date: toDoTask.child.date,
                                               importance: toDoTask.child.importance,
                                               checked: toDoTask.child.checked,
                })
            })
        })
    })();

    addListeners = (() => {
        const toDos = document.querySelector(".todos");
        if (toDos.textContent == false) {
            toDos.textContent = "Seems you are free now. Add some tasks"
        } else {
            mainTasks.forEach(e => {
                e.lastChild.addEventListener("click", (e) => {
                    this.calledInput.style.display = "flex";
                    e.target.nodeName == "IMG" ? this.pushed = e.target.parentNode : this.pushed = e.target;
                });
            });
        };
        this.inpCall.addEventListener("click", () => {
            this.field.style.display = "flex";
        });
        this.inputing.img.addEventListener("click", () => {
            this.field.style.display = "none";
            this.inputing.input.value = "";
        });
        this.inputing.button.addEventListener("click", () => {
            if (this.inputing.input.value == false) return;
            this.navObjs = DOMinate.DOMNavEdit(this.inputing.input.value);
            this.toDoObj = DOMinate.DOMToDoEdit(this.inputing.input.value, this.navObjs.element.classList);

            toJson.push({tittle: this.toDoObj.tittle.textContent, childs: []});
            mainTasks.push({tittle: this.toDoObj.tittle, parent: this.toDoObj.parent, lastChild: this.toDoObj.lastChild, childs: this.toDoObj.childs});

            console.log(mainTasks);

            this.inputing.input.value = "";
            this.field.style.display = "none";

            localStorage.setItem("data", JSON.stringify(toJson));

            this.toDoObj.lastChild.addEventListener("click", (e) => {
                this.calledInput.style.display = "flex";
                e.target.nodeName == "IMG" ? this.pushed = e.target.parentNode : this.pushed = e.target;
            })
        });

        this.inputing.button1.addEventListener("click", () => {
            const inputText = document.querySelector(".f1 > .inputField.card > label > input");
            const timeInput = document.querySelectorAll(".timeInput > *");
            const impInput =  document.querySelector(".impInp > label input:checked").classList;

            if(!inputText.value || !timeInput[0].value || !timeInput[1].value) return;

            const toDoTask = DOMinate.taskToDo(inputText.value, "", this.pushed, impInput, timeInput[0].value, timeInput[1].value);
            DOMinate.taskNav(inputText.value, this.pushed, toDoTask.class);

            toDoTask.child.childClass = toDoTask.class;
            mainTasks[toDoTask.nums].childs.push(toDoTask.child);
            toJson[toDoTask.nums].childs.push({name: toDoTask.child.name,
                                               date: toDoTask.child.date,
                                               importance: toDoTask.child.importance,
                                               checked: toDoTask.child.checked,
            })
            localStorage.setItem("data", JSON.stringify(toJson));
            this.remove()
        });
        this.inputing.img1.addEventListener("click", () => {
            this.remove();
        });

        this.inputing.sortImg.addEventListener("click", ()  => {
            mainTasks.forEach(e => {
                this.filter(e);
            })
            this.count += 1;
        })

        this.changable.today.addEventListener("click", () => {
            mainTasks.forEach(element => {
                const childs = element.childs.map(a => {return {...a}});
                this.childRemove(element.parent);
                childs.forEach(e => {
                    if(`${e.date.getFullYear()}-${e.date.getMonth()}-${e.date.getDay()}` == `${this.today.getFullYear()}-${this.today.getMonth()}-${this.today.getDay()}`
                        && !e.checked) {
                        DOMinate.childReAppend(e.childObj, element.parent, element.lastChild, "Today");
                    }
                });
                this.count -= 1;
                this.filter(element);
                this.count += 1;
            })
        })

        this.changable.all.addEventListener("click", () => {
            mainTasks.forEach(element => {
                this.childRemove(element.parent);
                element.childs.forEach(e => {
                    if(!e.checked) DOMinate.childReAppend(e.childObj, element.parent, element.lastChild, "All tasks");
                });
                this.count -= 1;
                this.filter(element);
                this.count += 1;
            })
        })

        this.changable.compl.addEventListener("click", () => {
            mainTasks.forEach(element => {
                this.childRemove(element.parent);
                const header = document.querySelector("header h1");
                header.textContent = "Completed";
                element.childs.forEach(e => {
                    if(e.checked) {
                        DOMinate.childReAppend(e.childObj, element.parent, element.lastChild);
                    };
                });
                this.count -= 1;
                this.filter(element);
                this.count += 1;
            })
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

    childRemove(parent) {
        const childs = [];
        while (parent.firstChild != parent.lastChild) {
            childs.push(parent.firstChild);
            parent.removeChild(parent.firstChild);
        };
        return childs;
    }

    filter(obj) {
        const childs = this.childRemove(obj.parent);
        if (this.count % 2 == 0){
            var sorted = obj.childs.toSorted((a,b) => a.date - b.date);
        } else {
            var sorted = obj.childs.toSorted((a,b) => {
                if(a.importance==b.importance) return 0;
                else if((a.importance=="imp" && (b.importance=="mid" || b.importance==undefined)) || (a.importance=="mid" && b.importance == undefined)) return -1;
                else if((b.importance=="imp" && (a.importance=="mid" || a.importance==undefined)) || (b.importance=="mid" && a.importance == undefined)) return 1;
            })
        }

        sorted.forEach(element => {
            childs.forEach(el => {
                if(element.childClass == el.classList) {
                    DOMinate.childReAppend(el, obj.parent, obj.lastChild);
                };
            });
        })
    }


    static giveClass(ul, place, name="main") {
        try {
            const n = place.at(-1).parent.classList[0].at(-1);
            if (n == place.length) {
                ul.classList = `${name}${+n + 1}`;
                return;
            }
            ul.classList = `${name}${place.length}`;
        } catch{
            ul.classList = `${name}${place.length}`;
        }
    }

    static separator(hourTime, monthTime) {
        hourTime = hourTime.split(":");
        monthTime = monthTime.split("-");
        return {hourTime, monthTime};
    }

    static listenerForTasks(element, num, cls) {
        element.addEventListener("click", () => {
            mainTasks[num].childs.forEach(e => {
                if(e.childClass == cls) {
                    mainTasks[num].childs[mainTasks[num].childs.indexOf(e)].checked = element.checked;
                    toJson[num].childs[mainTasks[num].childs.indexOf(e)].checked = element.checked;
                    localStorage.setItem("data", JSON.stringify(toJson));
                    element.parentNode.parentNode.removeChild(element.parentNode);
                    return;
                }
            })
        })
    }
}



class DOMinate {
    static DOMNavEdit(value) {
        const customProj = document.querySelector(".custom");
        const newGroup = document.createElement("ul");
        const para = document.createElement("p");
        para.textContent = value;
        main.giveClass(newGroup, mainTasks);
        newGroup.appendChild(para);
        customProj.appendChild(newGroup);
        return {tittle: para, element: newGroup};
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
        return {tittle: para, parent: tasks, lastChild: task, childs:[]};
    }

    static taskNav(tittle, child, cls) {
        const parent = child.parentNode;
        const li = document.createElement("li");
        const nav = document.querySelector(`nav .${parent.classList}`);
        li.textContent = tittle;
        li.classList = cls;
        nav.appendChild(li);
    }

    static childReAppend(child, parent, last, text = "") {
        if(text != "") {
            const header = document.querySelector("header h1");
            header.textContent = text;
        }
        parent.insertBefore(child, last);
    }

    static taskToDo(tittle, date, child, importance, hourBased = "", monthBased = "", checked = false) {
        let nums;
        const parent = child.parentNode;
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        if (date === "") {
            const time = main.separator(hourBased, monthBased);
            date = new Date(time.monthTime[0], (+time.monthTime[1] - 1), time.monthTime[2], time.hourTime[0], time.hourTime[1]);
        }
        const li = document.createElement("li");
        const input = document.createElement("input");
        const div = document.createElement("div");
        const para1 = document.createElement("p");
        const para2 = document.createElement("p");

        mainTasks.forEach(e => {
            e.parent.classList == parent.classList ? nums = mainTasks.indexOf(e) : console.log("uwi");
        })

        main.giveClass(li, mainTasks[nums].childs, "sub");

        para1.textContent = tittle;
        para2.textContent = `${date.getHours()}:${date.getMinutes()} ${daysOfWeek[date.getDay()]}`;
        para2.classList = "timeManage";

        if (importance == "mid") {
            input.classList = "mid";
        } else if (importance == "imp") {
            input.classList = "imp";
        };
        input.type = "checkbox";
        input.checked = checked;

        div.appendChild(para1);
        div.appendChild(para2);

        li.appendChild(input);
        li.appendChild(div);

        if(!checked) parent.insertBefore(li, child);

        main.listenerForTasks(input, nums, li.classList[0]);

        return {nums, child: {name: tittle, date, importance: input.classList[0], checked, childObj: li}, class: li.classList[0]}
    }
}

export {main};