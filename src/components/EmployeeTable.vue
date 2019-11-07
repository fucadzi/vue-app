<template>
    <div id="employee-table">
        <p v-if="employees.length < 1" class="empty-table"> No employees </p>
        <table v-else>
        <thead>
            <tr>
                <th>Employee name</th>
                <th>Employee email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="person in employees" :key="person.id">
                <td v-if="editing === person.id">
                    <input class="name" type="text" v-model="person.name"/>
                </td>
                <td v-else class="name">{{ person.name }}</td>
                <td v-if="editing === person.id">
                    <input class="email" type="text" v-model="person.email"/>
                </td>
                <td v-else class="email">{{ person.email }}</td>
                <td v-if="editing === person.id">
                    <button class="save" @click="editEmployee(person)">Save</button>
                    <button class="cancel" @click="cancelEdit(person)" >Cancel</button>
                </td>
                <td v-else>
                    <button class="edit" @click="editMode(person)">Edit</button>
                    <button class="delete" @click="$emit('delete:employee', person.id)">Delete</button>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'employee-table',
        props: {
            employees: Array
        },
        data() {
            return {
                editing: null
            }
        },
        methods: {
            editMode(employee) {
                this.chachedEmployee = Object.assign({}, employee);
                this.editing = employee.id;
            },
            editEmployee(employee){
                if(employee.name === '' || employee.mail === '') return;
                this.$emit('edit:employee', employee.id, employee);
                this.editing = null;
            },
            cancelEdit(employee){
                Object.assign(employee, this.chachedEmployee);
                this.editing = null;
            }
        }
    }
</script>

<style scoped>
    button {
        margin-right: 10px;
    }
</style>