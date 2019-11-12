<template>
  <div id="add">
    <h1>Add new employee</h1>
    <employee-form @add:employee="addEmployee" />
  </div>
</template>

<script>
import EmployeeForm from "../components/EmployeeForm.vue";

export default {
  name: "EmployeeList",
  components: {
    EmployeeForm
  },

  methods: {
    async addEmployee(data) {
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          }
        );
        let result = await response.json();
        console.log(result);
        // this.list = [...this.list, result];
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>