async function fetchEmployees() {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/v1/emp/employees', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

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
            `;
            employeeList.appendChild(div);
        });
    } catch (error) {
        alert('Error fetching employees');
    }
}
