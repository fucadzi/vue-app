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
    addEmployee(data) {
        this.$axios.post("https://jsonplaceholder.typicode.com/users", data)
            .then((response) => {
                this.$store.commit('addEmployee', response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
  }
};
</script>