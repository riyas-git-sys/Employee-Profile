// Debounce utility
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const state = {
        employees: window.mockEmployees || [...mockEmployees], // Using your externally linked data
        currentView: 'dashboard',
        editingId: null,
        currentPage: 1,
        itemsPerPage: 5,
        filteredEmployees: window.mockEmployees || [...mockEmployees],
        searchTerm: '',
        departmentFilter: '',
        roleFilter: ''
    };

    const appEl = document.getElementById('app');
    if (!appEl) {
        console.error('App element not found');
        return;
    }

    function render() {
        if (state.currentView === 'dashboard') {
            renderDashboard();
        } else {
            renderForm();
        }
    }

    function filterEmployees() {
        const term = state.searchTerm.toLowerCase();
        const dept = state.departmentFilter;
        const role = state.roleFilter;

        state.filteredEmployees = state.employees.filter(emp => {
            const matchesSearch = `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(term) ||
                emp.email.toLowerCase().includes(term);
            const matchesDept = !dept || emp.department === dept;
            const matchesRole = !role || emp.role === role;
            return matchesSearch && matchesDept && matchesRole;
        });

        // Adjust current page if it's now out of bounds
        const totalPages = Math.ceil(state.filteredEmployees.length / state.itemsPerPage);
        if (state.currentPage > totalPages && totalPages > 0) {
            state.currentPage = totalPages;
        } else if (totalPages === 0) {
            state.currentPage = 1;
        }
    }

    const debouncedSearch = debounce(() => {
        const searchInput = document.getElementById('search');
        if (searchInput) {
            state.searchTerm = searchInput.value;
            filterEmployees();
            render();
        }
    }, 300);

    function getRandomColor() {
        const colors = ['#FF5733', '#33B5E5', '#FFB400', '#00C851', '#AA66CC', '#FF4444', '#0099CC', '#33DDFF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function renderDashboard() {
        filterEmployees(); // Ensure filters are applied before rendering
        
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        const paginatedEmployees = state.filteredEmployees.slice(startIndex, endIndex);
        const totalPages = Math.ceil(state.filteredEmployees.length / state.itemsPerPage);

        appEl.innerHTML = `
            <div class="modal-overlay hidden" id="form-modal">
                <div class="modal-content form-modal">
                    <div id="form-container"></div>
                </div>
            </div>
            <header>
                <div class="logo">
                    <div class="logo-text">
                        <img src="https://i.ibb.co/rfkkyzbB/emplogo.webp" alt="emplogo" height="80" width="80">
                    </div>
                    <div class="filters-mob-view">
                        <select class="filter-select" id="filter-department">
                            <option value="">All Departments</option>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        <select class="filter-select" id="filter-role">
                            <option value="">All Roles</option>
                            <option value="Manager">Manager</option>
                            <option value="Developer">Developer</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Designer">Designer</option>
                        </select>
                    </div>
                </div>
                <div class="controls">
                    <div class="search-container">
                        <input type="text" id="search" placeholder="Search employees..." value="${state.searchTerm}" />
                        <button id="clear-search" class="clear-btn" style="display: ${state.searchTerm ? 'inline' : 'none'}">×</button>
                    </div>
                    <div class="filters-lap-view">
                        <select class="filter-select" id="filter-department-lap">
                            <option value="">All Departments</option>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        <select class="filter-select" id="filter-role-lap">
                            <option value="">All Roles</option>
                            <option value="Manager">Manager</option>
                            <option value="Developer">Developer</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Designer">Designer</option>
                        </select>
                    </div>
                    <div class="sort-container">
                        <button class="add-btn" id="add-employee">Add Employee</button>
                    </div>
                </div>
            </header>
            <div id="delete-confirmation-modal" class="modal-overlay hidden">
                <div class="modal-content">
                    <h3 id="delete-message">Are you sure you want to delete this employee?</h3>
                    <div class="modal-actions">
                        <button id="confirm-delete">Confirm</button>
                        <button id="cancel-delete">Cancel</button>
                    </div>
                </div>
            </div>

            <div class="employee-list">
                ${paginatedEmployees.length > 0 ? 
                    paginatedEmployees.map(emp => `
                        <div class="employee-card" data-id="${emp.id}">
                            <div class="emp-logo">
                                <div class="emp-logo-text" style="background-color: ${getRandomColor()}">
                                    ${emp.firstName[0]}${emp.lastName[0]}
                                </div>
                                <h3 class="emp-name">${emp.firstName} ${emp.lastName}</h3>
                            </div>
                            <p><strong>ID:</strong> ${emp.id}</p>
                            <p><strong>Email:</strong> ${emp.email}</p>
                            <p><strong>Department:</strong> ${emp.department}</p>
                            <p><strong>Role:</strong> ${emp.role}</p>
                            <div class="actions">
                                <button class="edit-btn" data-id="${emp.id}">Edit</button>
                                <button class="delete-btn" data-id="${emp.id}" data-name="${emp.firstName} ${emp.lastName}">Delete</button>
                            </div>
                        </div>
                    `).join('') : 
                    '<div class="no-results">No employees found matching your criteria</div>'
                }
            </div>

            <div class="plus-btn">
                <button class="add-btn-circle" id="add-employee-circle">+</button>
            </div>

            ${state.filteredEmployees.length > state.itemsPerPage ? `
                <div class="pagination">
                    <button id="prev-page" ${state.currentPage === 1 ? 'disabled' : ''}>Previous</button>
                    <span>Page ${state.currentPage} of ${totalPages}</span>
                    <button id="next-page" ${state.currentPage === totalPages ? 'disabled' : ''}>Next</button>
                </div>
            ` : ''}
        `;

        // Set filter values
        ['filter-department', 'filter-department-lap'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = state.departmentFilter;
        });
        
        ['filter-role', 'filter-role-lap'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = state.roleFilter;
        });

        // Event listeners
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.addEventListener('input', debouncedSearch);
        }

        document.getElementById('clear-search')?.addEventListener('click', () => {
            state.searchTerm = '';
            filterEmployees();
            render();
        });

        const handleFilterChange = () => {
            const deptFilter = document.getElementById('filter-department') || document.getElementById('filter-department-lap');
            const roleFilter = document.getElementById('filter-role') || document.getElementById('filter-role-lap');
            
            if (deptFilter) state.departmentFilter = deptFilter.value;
            if (roleFilter) state.roleFilter = roleFilter.value;
            
            filterEmployees();
            render();
        };

        ['filter-department', 'filter-role', 'filter-department-lap', 'filter-role-lap'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', handleFilterChange);
        });

        document.getElementById('add-employee')?.addEventListener('click', showEmployeeForm);
        document.getElementById('add-employee-circle')?.addEventListener('click', showEmployeeForm);

        function showEmployeeForm() {
            state.currentView = 'form';
            state.editingId = null;
            renderForm();
            document.getElementById('form-modal').classList.remove('hidden');
        }

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                state.editingId = id;
                state.currentView = 'form';
                renderForm();
                document.getElementById('form-modal').classList.remove('hidden');
            });
        });

        let employeeIdToDelete = null;
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                employeeIdToDelete = parseInt(e.target.dataset.id);
                const empName = e.target.dataset.name;
                const modal = document.getElementById('delete-confirmation-modal');
                if (modal) {
                    document.getElementById('delete-message').textContent = 
                        `Are you sure you want to delete profile of ${empName}?`;
                    modal.classList.remove('hidden');
                }
            });
        });

        document.getElementById('confirm-delete')?.addEventListener('click', () => {
            if (employeeIdToDelete !== null) {
                state.employees = state.employees.filter(emp => emp.id !== employeeIdToDelete);
                employeeIdToDelete = null;
                filterEmployees();
                render();
                document.getElementById('delete-confirmation-modal').classList.add('hidden');
            }
        });

        document.getElementById('cancel-delete')?.addEventListener('click', () => {
            employeeIdToDelete = null;
            document.getElementById('delete-confirmation-modal').classList.add('hidden');
        });

        document.getElementById('prev-page')?.addEventListener('click', () => {
            if (state.currentPage > 1) {
                state.currentPage--;
                render();
            }
        });

        document.getElementById('next-page')?.addEventListener('click', () => {
            const totalPages = Math.ceil(state.filteredEmployees.length / state.itemsPerPage);
            if (state.currentPage < totalPages) {
                state.currentPage++;
                render();
            }
        });
    }

    function renderForm() {
        const emp = state.editingId ? 
            state.employees.find(emp => emp.id === state.editingId) : 
            { firstName: '', lastName: '', email: '', department: '', role: '' };

        const formContainer = document.getElementById('form-container');
        if (!formContainer) return;

        formContainer.innerHTML = `
            <h2>${state.editingId ? 'Edit' : 'Add'} Employee</h2>
            <form class="employee-form" id="employee-form">
                <input type="text" id="firstName" value="${emp.firstName}" placeholder="First Name" required />
                <div class="error" id="firstName-error"></div>
                <input type="text" id="lastName" value="${emp.lastName}" placeholder="Last Name" required />
                <div class="error" id="lastName-error"></div>
                <input type="email" id="email" value="${emp.email}" placeholder="Email" required />
                <div class="error" id="email-error"></div>
                <select id="department" required>
                    <option value="">Select Department</option>
                    <option value="HR" ${emp.department === 'HR' ? 'selected' : ''}>HR</option>
                    <option value="IT" ${emp.department === 'IT' ? 'selected' : ''}>IT</option>
                    <option value="Finance" ${emp.department === 'Finance' ? 'selected' : ''}>Finance</option>
                    <option value="Marketing" ${emp.department === 'Marketing' ? 'selected' : ''}>Marketing</option>
                </select>
                <div class="error" id="department-error"></div>
                <select id="role" required>
                    <option value="">Select Role</option>
                    <option value="Manager" ${emp.role === 'Manager' ? 'selected' : ''}>Manager</option>
                    <option value="Developer" ${emp.role === 'Developer' ? 'selected' : ''}>Developer</option>
                    <option value="Analyst" ${emp.role === 'Analyst' ? 'selected' : ''}>Analyst</option>
                    <option value="Designer" ${emp.role === 'Designer' ? 'selected' : ''}>Designer</option>
                </select>
                <div class="error" id="role-error"></div>
                <div class="form-actions">
                    <button type="submit">Save</button>
                    <button type="button" id="cancel-btn">Cancel</button>
                </div>
            </form>
        `;

        document.getElementById('cancel-btn')?.addEventListener('click', () => {
            document.getElementById('form-modal').classList.add('hidden');
            state.currentView = 'dashboard';
            render();
        });

        document.getElementById('employee-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.error').forEach(el => el.textContent = '');

            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const department = document.getElementById('department').value;
            const role = document.getElementById('role').value;

            // Validation
            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!firstName) {
                document.getElementById('firstName-error').textContent = 'First name is required';
                isValid = false;
            }
            if (!lastName) {
                document.getElementById('lastName-error').textContent = 'Last name is required';
                isValid = false;
            }
            if (!email) {
                document.getElementById('email-error').textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = 'Enter a valid email';
                isValid = false;
            }
            if (!department) {
                document.getElementById('department-error').textContent = 'Please select a department';
                isValid = false;
            }
            if (!role) {
                document.getElementById('role-error').textContent = 'Please select a role';
                isValid = false;
            }

            if (!isValid) return;

            // Create/update employee
            const employee = {
                id: state.editingId || Date.now(),
                firstName,
                lastName,
                email,
                department,
                role
            };

            if (state.editingId) {
                // Update existing employee
                const index = state.employees.findIndex(e => e.id === state.editingId);
                if (index !== -1) {
                    state.employees[index] = employee;
                }
            } else {
                // Add new employee
                state.employees.unshift(employee);
            }

            // Reset and render
            state.editingId = null;
            state.currentView = 'dashboard';
            document.getElementById('form-modal').classList.add('hidden');
            filterEmployees();
            render();
        });
    }

    // Initial render
    render();
});