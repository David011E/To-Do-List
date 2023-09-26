window.addEventListener('load', function() {
    let form = document.querySelector(".new-task-form");
    let input = document.getElementById("new-task-input");
    let list_el = document.getElementById("tasks");

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let task = input.value.trim(); // Remove leading and trailing spaces

        // Check if the task is not empty
        if (task) {
            let task_el = document.createElement('div');
            task_el.classList.add('task');

            let task_content_el = document.createElement('div');
            task_content_el.classList.add('content');

            task_el.appendChild(task_content_el);

            let task_input_el = document.createElement('input');
            task_input_el.classList.add('text');
            task_input_el.type = 'text';
            task_input_el.value = task;
            task_input_el.setAttribute('readonly', 'readonly');

            task_content_el.appendChild(task_input_el);

            let task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');

            let task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');
            task_edit_el.innerText = 'Edit';

            let task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');
            task_delete_el.innerText = 'Delete';

            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);

            task_el.appendChild(task_actions_el);

            list_el.appendChild(task_el);

            input.value = '';

            list_el.addEventListener('click', function(event) {
                if (event.target.classList.contains('edit')) {
                    let task_el = event.target.closest('.task');
                    let task_input_el = task_el.querySelector('.text');
            
                    if (event.target.innerText.toLowerCase() === "edit") {
                        event.target.innerText = "Save";
                        task_input_el.removeAttribute("readonly");
                        task_input_el.focus();
                    } else {
                        event.target.innerText = "Edit";
                        task_input_el.setAttribute("readonly", "readonly");
                    }
                } else if (event.target.classList.contains('delete')) {
                    let task_el = event.target.closest('.task');
                    list_el.removeChild(task_el);
                }
            });
        } else {
            // Display an alert when the task is empty
            alert('Please enter a task before submitting.');
        }
    });
});