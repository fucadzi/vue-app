import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: []
    },
    mutations: {
        deleteEmployee(state, id) {
            state.list = state.list.filter(list => list.id !== id);
        },
        editEmployee(state, newPerson) {
            state.list = state.list.map(person =>
                person.id === newPerson.id ? newPerson : person
            );
        },
        addEmployee(state, person) {
            state.list = [...state.list, person];
        }
    },
    actions: {

    }
})
