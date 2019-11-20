<template>
  <div id="details">
    <div @click="back">Back</div>
    <h1>User {{ $route.params.id }}</h1>
    <table>
        <tr>
            <td>Name: </td>
            <td>{{this.name}}</td>
        </tr>
        <tr>
            <td>E-mail: </td>
            <td>{{this.email}}</td>
        </tr>
    </table>
  </div>
</template>

<script>
import { goBack } from "../helpers/RoutingHelper.js";

export default {
    name: "EmployeeDetails",
    data() {
        return {
            loading: false,
            name: null,
            email: null
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData: async function() {
            this.loading = true;
            try{
                const id = this.$route.params.id;
                let response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${id}`,
                    );
                let person = await response.json();

                this.name = person.name;
                this.email = person.email;
                this.loading = false;

            } catch(err) {
                console.log(err);
            }
        },
        back: () => {
            goBack();
        }
    }
};
</script>