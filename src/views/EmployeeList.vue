<template>
    <div id="list">
        <h1>Table</h1>
        <router-link to="/list/add">Add new employee</router-link>
        <router-view />
        <employee-table
            :employees="this.$store.state.list"
            @delete:employee="deleteEmployee"
            @edit:employee="editEmployee"
            />
    </div>
</template>

<script>
    import EmployeeTable from "../components/EmployeeTable.vue";

    export default {
        name: "EmployeeList",
        components: {
            EmployeeTable
        },
        props: {
            result: {
                type: Object
            }
        },
        data() {
            return {
                list: []
            };
        },
        mounted() {
            this.getEmployees();
        },
        methods: {
            async getEmployees() {
                try {
                    let response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                    );
                    let data = await response.json();
                    this.list = data;
                    this.$store.state.list = data;

                } catch (error) {
                    console.log(error);
                }
            },

            async deleteEmployee(id) {
                try {
                    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                    method: "DELETE"
                    });
                    this.$store.commit('deleteEmployee', id);
                } catch (error) {
                    console.log(error);
                }
            },

            editEmployee(id, updatedPerson) {

                let body = JSON.stringify(updatedPerson);
                this.$axios({
                        method: 'put',
                        url: `https://jsonplaceholder.typicode.com/users/${id}`,
                        data: updatedPerson
                    }).then((result) => {
                        this.$store.commit('editEmployee', result.data);
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        }
    };
</script>