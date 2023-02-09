<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col"></div>
            <div class="col-md-4 col-lg-4">
                <form @submit.prevent="onSubmit">
                    <div class="mb-5 text-center">
                        <h3>Reset your password</h3>
                    </div>
                    <div class=" mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input v-model="email" type="email" class="form-control">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <button type="submit" class="btn btn-primary">Send</button>
                </form>

            </div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
    setup() {
        const email = ref("")
        const auth = getAuth();

        return {
            email,
            onSubmit: () => {
                sendPasswordResetEmail(auth, email.value)
                    .then(() => {
                        alert("We have sent you an password reset email. Please check your inbox")
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                    });
            }

        }
    }
}
</script>
<style scoped>

</style>