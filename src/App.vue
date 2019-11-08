<template>
  <div id="app">
    <h1>Table</h1>
    <employee-form @add:employee="addEmployee"/>
    <employee-table :employees='list' 
      @delete:employee="deleteEmployee"
      @edit:employee="editEmployee" />
  </div>
</template>

<script>
  import EmployeeTable from './components/EmployeeTable.vue'
  import EmployeeForm from './components/EmployeeForm.vue'

  export default {
    name: 'app',
    components: {
      EmployeeTable,
      EmployeeForm
    },
    data() {
      return {
        list: []
      }
    },
    mounted() {
      this.getEmployees();
    },
    methods: {
      async getEmployees(){
        try {
          let response = await fetch('https://jsonplaceholder.typicode.com/users');
          let data = await response.json();
          this.list = data;
        } catch (error){
          console.log(error);
        }
      },

      async addEmployee(data){
        try {
          let response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
          });
          let result = await response.json();
          this.list = [...this.list, result];
        } catch (error) {
          cosole.log(error);
        }
      },

      async deleteEmployee(id){
        try {
          await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method: 'DELETE'
          });
          this.list = this.list.filter(
            list => list.id !== id
          );
        } catch (error){
          console.log(error);
        }
      },

      async editEmployee(id, updatedPerson){
        try {
          let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
              method: 'PUT',
              body: JSON.stringify(updatedPerson),
              headers: { 'Content-type': 'application/json; charset=UTF-8' }
          });
          let newPerson = await response.json();

          this.list = this.list.map(person => person.id === id ? newPerson : person );

        } catch (error) {
          console.log(error);
        }        
      }
    }
  }
  </script>

  <style> 
    #app{
      padding: 40px;
    }
    button {
      background: #009435;
      border: 1px solid #009435;
    }

    .small-container {
      max-width: 680px;
    }
</style>
