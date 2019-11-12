<template>
  <div id="list">
    <h1>Table</h1>
    <router-link to="/list/add">Add new employee</router-link>
    <router-view />
    <employee-table
      :employees="list"
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
      } catch (error) {
        console.log(error);
      }
    },

    async deleteEmployee(id) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: "DELETE"
        });
        this.list = this.list.filter(list => list.id !== id);
      } catch (error) {
        console.log(error);
      }
    },

    async editEmployee(id, updatedPerson) {
      try {
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedPerson),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          }
        );
        let newPerson = await response.json();

        this.list = this.list.map(person =>
          person.id === id ? newPerson : person
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>