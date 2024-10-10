document.getElementById('add-employee-btn').addEventListener('click', async () => {
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const salary = document.getElementById('salary').value;
    const department = document.getElementById('department').value;

    try {
        const res = await fetch('/api/v1/emp/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                position,
                salary,
                department,
                date_of_joining: new Date()
            })
        });

        const data = await res.json();
        if (res.status === 201) {
            alert('Employee added successfully');
            fetchEmployees();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error adding employee');
    }
});

async function fetchEmployees() {
    try {
        const res = await fetch('/api/v1/emp/employees');
        const employees = await res.json();
        const employeeList = document.getElementById('employee-list');
        employeeList.innerHTML = '';

        employees.forEach(emp => {
            const div = document.createElement('div');
            div.className = 'employee';
            div.innerHTML = `
                <h4>${emp.first_name} ${emp.last_name}</h4>
                <p>Email: ${emp.email}</p>
                <p>Position: ${emp.position}</p>
                <p>Department: ${emp.department}</p>
                <button onclick="deleteEmployee('${emp._id}')">Delete</button>
                <button onclick="updateEmployee('${emp._id}')">Update</button>
            `;
            employeeList.appendChild(div);
        });
    } catch (error) {
        alert('Error fetching employees');
    }
}

async function deleteEmployee(id) {
    try {
        const res = await fetch(`/api/v1/emp/employees?eid=${id}`, {
            method: 'DELETE'
        });

        if (res.status === 204) {
            alert('Employee deleted successfully');
            fetchEmployees();
        } else {
            const data = await res.json();
            alert(data.message);
        }
    } catch (error) {
        alert('Error deleting employee');
    }
}

async function updateEmployee(id) {
    const newPosition = prompt("Enter new position:");
    const newSalary = prompt("Enter new salary:");

    if (newPosition && newSalary) {
        try {
            const res = await fetch(`/api/v1/emp/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    position: newPosition,
                    salary: newSalary
                })
            });

            if (res.status === 200) {
                alert('Employee updated successfully');
                fetchEmployees();
            } else {
                const data = await res.json();
                alert(data.message);
            }
        } catch (error) {
            alert('Error updating employee');
        }
    }
}
