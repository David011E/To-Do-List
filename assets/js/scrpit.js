window.addEventListener('load', function() {
    let form = document.querySelector(".new-task-form");
    let input = document.getElementById("new-task-input");
    let list_el = document.getElementById("tasks");

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let task = input.value.trim(); // Remove leading and trailing spaces

        // Check if the task is not empty
        if (task) {
            let task_element = document.createElement('div');
            task_element.classList.add('task');

            let task_content_element = document.createElement('div');
            task_content_element.classList.add('content');

            task_element.appendChild(task_content_element);

            let task_input_element = document.createElement('input');
            task_input_element.classList.add('text');
            task_input_element.type = 'text';
            task_input_element.value = task;
            task_input_element.setAttribute('readonly', 'readonly');

            task_content_element.appendChild(task_input_element);

            let task_actions_element = document.createElement('div');
            task_actions_element.classList.add('actions');

            let task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');
            task_edit_el.innerText = 'Edit';

            let task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');
            task_delete_el.innerText = 'Delete';

            task_actions_element.appendChild(task_edit_el);
            task_actions_element.appendChild(task_delete_el);

            task_element.appendChild(task_actions_element);

            list_el.appendChild(task_element);

            input.value = '';

            actions(list_el);

        } else {
            // Display an alert when the task is empty
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a task before submitting.',
              })
        }
    });
});

function actions(list_el) {
    
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

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                
                if (result.isConfirmed) {

                    let task_el = event.target.closest('.task');
            
            // Check if the task_el is a direct child of list_el before removing it
            if (list_el.contains(task_el)) {
                list_el.removeChild(task_el);
            }
                  Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                  )
                }
              })
            
        }
    });    
}
