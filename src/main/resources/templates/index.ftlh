<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div id="app">
        <div id="employee-list-container">
            <#list employees as employee>
                <div class="employee-card" data-employee-id="${employee.id}">
                    <h3>${employee.firstName} ${employee.lastName}</h3>
                    <p>ID: ${employee.id}</p>
                    <p>Email: ${employee.email}</p>
                    <p>Department: ${employee.department}</p>
                    <p>Role: ${employee.role}</p>
                    <button class="edit-btn" data-id="${employee.id}">Edit</button>
                    <button class="delete-btn" data-id="${employee.id}">Delete</button>
                </div>
            </#list>
        </div>
    </div>
    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>