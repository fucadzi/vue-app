<template>
    <div id="employee-form">
        <form @submit.prevent="handleSubmit">
            <label>Employee name</label>
            <input class="form-name" v-model="empl.name" 
                type="text" 
                @focus="clearStatus" 
                :class="{ 'has-error': submitting && invalidName }"
                ref="name" />
            <label>Employee Email</label>
            <input class="form-email" v-model="empl.email" type="text" @focus="clearStatus" :class="{ 'has-error': submitting && invalidEmail }" />

            <p v-if="error && submitting" class="error-message">
                Please fill out all required fields
            </p>
            <p v-if="success" class="success-message">
                Employee added
            </p>

            <button class="form-submit">Add Employee</button>
        </form>
    </div>
</template>
<script>
export default {
    name: "employee-form",
    data() {
        return {
            submitting: false,
            error: false,
            success: false,
            empl: {
                name: '',
                email: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            this.submitting = true;
            this.clearStatus();
            
            if(this.invalidName || this.invalidEmail){
                this.error = true;
                return;
            }
            this.$emit('add:employee', this.empl);
            this.$refs.name.focus()

            this.empl = {
                name: '',
                email: ''
            }
            this.error = false;
            this.success = true;
            this.submitting = false; 
        },
        clearStatus() {
            this.error = false;
            this.success = false;
        }
    },
    computed: {
        invalidName() {
            return this.empl.name === '';
        },
        invalidEmail() {
            return this.empl.email === '';
        }
    }
}
</script>

<style scoped>
    form {
        margin-bottom: 2rem;
    }

    [class*='-message'] {
        font-weight: bold;
    }

    .error-message {
        color: red;
    }

    .success-message {
        color: green;
    }
</style>