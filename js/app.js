//  class for modifying and deleting button
class ModifyTask {
  constructor() {
    this.delete();
    this.modify();
  }
  delete() {
    const buttonDelete = document.querySelectorAll('.delete-btn');
    for (const btnD of buttonDelete) {
      btnD.addEventListener('click', (e) => {
        if (e.target.parentElement.parentElement.className === 'draggable') {
          console.log(
            'this if ',
            e.target.parentElement.parentElement.className,
            e.target.parentElement.parentElement
          );
          e.target.parentElement.parentElement.remove();
          const itemDelete =
            e.target.parentElement.parentElement.querySelector('input').value;
          console.log('itemDelete', itemDelete);
          localStorage.removeItem(itemDelete);
        } else {
          console.log(
            'this else ',
            e.target.parentElement.parentElement.parentElement
          );
          e.target.parentElement.parentElement.parentElement.remove();
          const itemDelete =
            e.target.parentElement.parentElement.parentElement.querySelector(
              'input'
            ).value;
          console.log('itemDelete', itemDelete);
          localStorage.removeItem(itemDelete);
        }
      });
    }
  }
  modify() {
    let input;
    let inputValue;
    const buttonModify = document.querySelectorAll('.modify-btn');
    for (const btnM of buttonModify) {
      btnM.addEventListener('click', (e) => {
        if (e.target.parentElement.parentElement.className === 'draggable') {
          input = e.target.parentElement.parentElement.querySelector('input');
          inputValue = input.value;
        } else {
          input =
            e.target.parentElement.parentElement.parentElement.querySelector(
              'input'
            );
          inputValue = input.value;
        }
        input.removeAttribute('disabled');
        input.focus();
        this.updateLocalStorage(input, inputValue);
      });
    }
  }
  updateLocalStorage(input, inputValue) {
    const container = input.parentElement;
    const section = container.parentElement.parentElement;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === inputValue) {
        input.addEventListener('blur', (e) => {
          input.disabled = true;
          localStorage.removeItem(key);
          const task = {
            codeHTML: container.innerHTML,
            section: section.classList,
          };
          localStorage.setItem(input.value, JSON.stringify(task));
        });
      }
    }
  }
}
//  class for create text for  write your   task
class createInput {
  constructor(section) {
    this.section = section;
    this.input = this.createInput();
    this.buttonModify = this.createButton(
      'modify',
      ` <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 icon-pencil"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>`
    );
    this.buttonDelete = this.createButton(
      'delete',
      ` <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 icon-trash"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>`
    );
    this.container = this.createContainer();
    this.attachListeners();
    /*    this.addToLocalStorage(); */
    this.ModifyTask = new ModifyTask();
    this.draggable = new draggable();
  }

  createInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.disabled = false;
    input.placeholder = 'Enter your task';
    input.classList.add('input-text');
    return input;
  }

  createButton(className, svImage) {
    const button = document.createElement('button');
    button.classList.add(`${className}-btn`);
    button.innerHTML = svImage;
    return button;
  }

  createContainer() {
    const container = document.createElement('div');
    container.id = 'input-container';
    container.classList.add('draggable');
    container.draggable = true;
    container.appendChild(this.input);
    container.appendChild(this.buttonModify);
    container.appendChild(this.buttonDelete);
    const task = this.section.querySelector('.task');
    task.appendChild(container);
    return container;
  }
  attachListeners() {
    this.input.addEventListener('blur', (e) => {
      e.target.disabled = true;
    });

    this.input.addEventListener('blur', (e) => {
      if (e.target.value !== 'Enter your task') {
        const task = {
          codeHTML: this.container.innerHTML,
          section: this.section.classList,
        };
        localStorage.setItem(e.target.value, JSON.stringify(task));
      }
    });
  }
}

//  class show task in  localhost to   browser
class showTaskFromLocalStorage {
  constructor(allSection) {
    this.allSection = allSection;
    this.show();
    this.draggable = new draggable();
    this.ModifyTask = new ModifyTask();
  }

  show() {
    for (const section of this.allSection) {
      const tasks = this.getTasksForSection(section.classList);
      tasks.forEach((taskData) => {
        const div = document.createElement('div');
        div.id = 'input-container';
        div.className = 'draggable';
        div.draggable = true;
        div.innerHTML = `${
          JSON.parse(localStorage.getItem(taskData)).codeHTML
        }`;
        section.querySelector('.task').append(div);
      });
      this.updateTaskValues(section, tasks);
    }
  }

  getTasksForSection(sectionName) {
    const tasks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const taskData = JSON.parse(localStorage.getItem(key));
      if (taskData.section[0] === sectionName[0]) {
        tasks.push(key);
      }
    }

    return tasks;
  }

  updateTaskValues(section, tasks) {
    const task = section.querySelector('.task');
    const divInputs = task.querySelectorAll('#input-container');
    divInputs.forEach((div, index) => {
      const input = div.querySelector('input');
      input.value = tasks[index];
    });
  }
}

//  class drag drop for  pc and phone
class DragDrop {
  constructor(element, event) {
    this.element = element;
    this.event = event;
    this.originDroppable = null;
    this.destinationDroppable = null;
    this.highlightClass = 'highlight';
    this.draggingClass = 'dragging';
    this.addEventListeners();
    this.drop();
  }

  addEventListeners() {
    this.element.addEventListener(
      `${this.event}start`,
      this.handleTouchStart.bind(this)
    );
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.element.addEventListener(
      `${this.event}end`,
      this.handleTouchEnd.bind(this)
    );
  }

  handleTouchStart(event) {
    this.originDroppable = event.target.closest('.droppable');
    this.element.classList.add(this.draggingClass);
  }

  handleTouchMove(event) {
    event.preventDefault();
    this.element.style.left = `${event.touches[0].pageX}px`;
    this.element.style.top = `${event.touches[0].pageY}px`;
    this.destinationDroppable = this.findDroppable(
      event.touches[0].clientX,
      event.touches[0].clientY
    );
    this.highlightDroppable();
  }

  updateLocalStorage(elementTarget) {
    let divInput;
    if (elementTarget.className === 'input-text') {
      divInput = elementTarget.parentElement;
      console.log('div if ', divInput);
    } else {
      divInput = elementTarget;
      console.log('div else ', divInput);
    }
    console.log(divInput);
    let task = {
      codeHTML: divInput.innerHTML,
      section: divInput.parentElement.parentElement.classList,
    };
    localStorage.setItem(
      divInput.querySelector('input').value,
      JSON.stringify(task)
    );
  }

  handleTouchEnd(event) {
    this.element.classList.remove(this.draggingClass);
    this.moveElement();
    this.reset();
    console.log(event.target);
    this.updateLocalStorage(event.target);
  }

  findDroppable(x, y) {
    const droppables = document.querySelectorAll('.droppable');
    for (const droppable of droppables) {
      const rect = droppable.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        return droppable;
      }
    }
    return null;
  }

  highlightDroppable() {
    const droppables = document.querySelectorAll('.droppable');
    for (const droppable of droppables) {
      droppable.classList.remove(this.highlightClass);
    }
    if (
      this.destinationDroppable &&
      this.destinationDroppable !== this.originDroppable
    ) {
      this.destinationDroppable.classList.add(this.highlightClass);
    }
  }

  moveElement() {
    if (
      this.destinationDroppable &&
      this.destinationDroppable !== this.originDroppable
    ) {
      const task = this.destinationDroppable.querySelector('.task');
      task.insertBefore(this.element, task.children[1]);
    }
  }

  reset() {
    this.originDroppable = null;
    this.destinationDroppable = null;
  }

  drop() {
    const droppables = document.querySelectorAll('.droppable');
    for (const droppable of droppables) {
      droppable.addEventListener('dragover', (event) => {
        event.preventDefault();
        droppable.classList.add('highlight');
      });
      droppable.addEventListener('dragleave', (event) => {
        droppable.classList.remove('highlight');
      });
      droppable.addEventListener('drop', (event) => {
        event.preventDefault();
        droppable.classList.remove('highlight');
        const draggedElement = document.querySelector('.dragging');
        const task = droppable.querySelector('.task');
        task.insertBefore(draggedElement, task.children[1]);
        /*           droppable.appendChild(draggedElement); */
      });
    }
  }
}
//  class call class drag drop for  pc and phone
class draggable {
  constructor() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
    const draggables = document.querySelectorAll('.draggable');
    for (const draggable of draggables) {
      if (isTouchDevice) {
        // user is interacting with a touch screen

        new DragDrop(draggable, 'touch');
      } else {
        // user is interacting with a mouse

        new DragDrop(draggable, 'drag');
      }
    }
  }
}

class App {
  static init() {
    const allSections = document.querySelectorAll('section');

    allSections.forEach((section) => {
      const buttonAdd = section.querySelector('.addBtn');
      buttonAdd.addEventListener('click', () => {
        const typeSection = buttonAdd.parentElement;
        new createInput(typeSection);
      });
    });
    new showTaskFromLocalStorage(allSections);
  }
}

App.init();
