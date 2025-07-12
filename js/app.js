// Debounce utility
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const state = {
        employees: [...mockEmployees],
        currentView: 'dashboard',
        editingId: null,
        currentPage: 1,
        itemsPerPage: 5,
        filteredEmployees: [...mockEmployees],
        searchTerm: '',
        departmentFilter: '',
        roleFilter: ''
    };

    const appEl = document.getElementById('app');

    function render() {
        if (state.currentView === 'dashboard') {
            renderDashboard();
        } else {
            renderForm();
        }
    }

    const debouncedSearch = debounce(() => {
        const searchInput = document.getElementById('search');
        const departmentSelect = document.getElementById('filter-department');
        const roleSelect = document.getElementById('filter-role');

        const term = searchInput?.value.toLowerCase() || '';
        const dept = departmentSelect?.value || '';
        const role = roleSelect?.value || '';

        state.searchTerm = term;
        state.departmentFilter = dept;
        state.roleFilter = role;

        state.filteredEmployees = state.employees.filter(emp => {
            const matchesSearch = `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(term) ||
                emp.email.toLowerCase().includes(term);
            const matchesDept = !dept || emp.department === dept;
            const matchesRole = !role || emp.role === role;
            return matchesSearch && matchesDept && matchesRole;
        });

        state.currentPage = 1;
        render();
    }, 3000);

    function renderDashboard() {
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        const paginatedEmployees = state.filteredEmployees.slice(startIndex, endIndex);
        const totalPages = Math.ceil(state.filteredEmployees.length / state.itemsPerPage);
        const searchInput = document.getElementById('search');
        const clearBtn = document.getElementById('clear-search');

        if (searchInput) {
            searchInput.value = state.searchTerm;
            searchInput.focus();
            searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);

            clearBtn.style.display = state.searchTerm ? 'inline' : 'none';

            searchInput.addEventListener('input', () => {
                clearBtn.style.display = searchInput.value ? 'inline' : 'none';
            });

            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                state.searchTerm = '';
                state.filteredEmployees = [...state.employees];
                state.currentPage = 1;
                render();
            });
        }

        appEl.innerHTML = `
            <div class="modal-overlay hidden" id="form-modal">
                <div class="modal-content form-modal">
                    <div id="form-container"></div>
                </div>
            </div>
            <header>
                <div class="logo">
                    <div class="logo-text">
                        <a href="https://ibb.co/mFJJz2vn"><img src="https://i.ibb.co/rfkkyzbB/emplogo.webp" alt="emplogo" border="0" height="80" width="80"></a>
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
                    </div>
                    <div class="filters-lap-view">
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
                ${paginatedEmployees.map(emp => `
                    <div class="employee-card" data-id="${emp.id}">
                        <h3>${emp.firstName} ${emp.lastName}</h3>
                        <p><strong>ID:</strong> ${emp.id}</p>
                        <p><strong>Email:</strong> ${emp.email}</p>
                        <p><strong>Department:</strong> ${emp.department}</p>
                        <p><strong>Role:</strong> ${emp.role}</p>
                        <div class="actions">
                            <button class="edit-btn" data-id="${emp.id}">Edit</button>
                            <button class="delete-btn" data-id="${emp.id}" data-name="${emp.firstName} ${emp.lastName}">Delete</button>
                        </div>
                    </div>
                `).join('')}
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

        document.getElementById('search').addEventListener('input', debouncedSearch);
        document.getElementById('filter-department').value = state.departmentFilter;
        document.getElementById('filter-role').value = state.roleFilter;
        document.getElementById('filter-department').addEventListener('change', debouncedSearch);
        document.getElementById('filter-role').addEventListener('change', debouncedSearch);

        document.getElementById('add-employee').addEventListener('click', () => {
            state.currentView = 'form';
            state.editingId = null;
            renderForm();
            document.getElementById('form-modal').classList.remove('hidden');
        });

        document.getElementById('add-employee-circle').addEventListener('click', () => {
            state.currentView = 'form';
            state.editingId = null;
            renderForm();
            document.getElementById('form-modal').classList.remove('hidden');
        });

        document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            state.editingId = id;
            state.currentView = 'form';
            renderForm();
            document.getElementById('form-modal').classList.remove('hidden');
        }));

        let employeeIdToDelete = null;

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                employeeIdToDelete = parseInt(e.target.dataset.id);
                const empName = e.target.dataset.name;
                const modal = document.getElementById('delete-confirmation-modal');
                document.getElementById('delete-message').textContent = `Are you sure you want to delete profile of ${empName}?`;
                if (modal) modal.classList.remove('hidden');
            });
        });

        const modal = document.getElementById('delete-confirmation-modal');

        document.getElementById('confirm-delete')?.addEventListener('click', () => {
            if (employeeIdToDelete !== null) {
                state.employees = state.employees.filter(emp => emp.id !== employeeIdToDelete);
                state.filteredEmployees = state.filteredEmployees.filter(emp => emp.id !== employeeIdToDelete);

                const startIdx = (state.currentPage - 1) * state.itemsPerPage;
                if (startIdx >= state.filteredEmployees.length && state.currentPage > 1) {
                    state.currentPage--;
                }

                modal.classList.add('hidden');
                employeeIdToDelete = null;
                render();
            }
        });

        document.getElementById('cancel-delete')?.addEventListener('click', () => {
            modal.classList.add('hidden');
            employeeIdToDelete = null;
        });

        document.getElementById('prev-page')?.addEventListener('click', () => {
            if (state.currentPage > 1) {
                state.currentPage--;
                render();
            }
        });

        document.getElementById('next-page')?.addEventListener('click', () => {
            if (state.currentPage < totalPages) {
                state.currentPage++;
                render();
            }
        });
    }

    function renderForm() {
        const emp = state.employees.find(emp => emp.id === state.editingId) || {};
        document.getElementById('form-container').innerHTML = `
            <h2>${state.editingId ? 'Edit' : 'Add'} Employee</h2>
            <form class="employee-form" id="employee-form">
                <input type="text" id="firstName" value="${emp.firstName || ''}" placeholder="First Name" required />
                <div class="error" id="firstName-error"></div>
                <input type="text" id="lastName" value="${emp.lastName || ''}" placeholder="Last Name" required />
                <div class="error" id="lastName-error"></div>
                <input type="email" id="email" value="${emp.email || ''}" placeholder="Email" required />
                <div class="error" id="email-error"></div>
                <select id="department">
                    <option value="">Select Department</option>
                    <option value="HR" ${emp.department === 'HR' ? 'selected' : ''}>HR</option>
                    <option value="IT" ${emp.department === 'IT' ? 'selected' : ''}>IT</option>
                    <option value="Finance" ${emp.department === 'Finance' ? 'selected' : ''}>Finance</option>
                    <option value="Marketing" ${emp.department === 'Marketing' ? 'selected' : ''}>Marketing</option>
                    <option value="Operations" ${emp.department === 'Operations' ? 'selected' : ''}>Operations</option>
                    <option value="Sales" ${emp.department === 'Sales' ? 'selected' : ''}>Sales</option>
                </select>
                <div class="error" id="department-error"></div>
                <select id="role">
                    <option value="">Select Role</option>
                    <option value="Employee" ${emp.role === 'Employee' ? 'selected' : ''}>Employee</option>
                    <option value="Manager" ${emp.role === 'Manager' ? 'selected' : ''}>Manager</option>
                    <option value="Director" ${emp.role === 'Director' ? 'selected' : ''}>Director</option>
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

        document.getElementById('cancel-btn').addEventListener('click', () => {
            document.getElementById('form-modal').classList.add('hidden');
            state.currentView = 'dashboard';
            render();
        });

        document.getElementById('employee-form').addEventListener('submit', (e) => {
            e.preventDefault();

            document.querySelectorAll('.error').forEach(el => el.textContent = '');

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const department = document.getElementById('department').value;
            const role = document.getElementById('role').value;

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

            const newEmp = {
                id: state.editingId || Date.now(),
                firstName,
                lastName,
                email,
                department,
                role,
            };

            if (state.editingId) {
                const idx = state.employees.findIndex(emp => emp.id === state.editingId);
                state.employees[idx] = newEmp;
            } else {
                state.employees.unshift(newEmp);
            }

            state.filteredEmployees = [...state.employees];
            state.editingId = null;
            state.currentView = 'dashboard';
            document.getElementById('form-modal').classList.add('hidden');
            render();
        });
    }

    render();
});