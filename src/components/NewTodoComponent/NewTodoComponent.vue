
<template>
    <div class="new-todo">
        <input v-model="title" required type="text" id="title-input" placeholder="Enter Title"/>
        <input v-model="description" type="text" id="description-input" placeholder="Enter Description"/>
        <button @click="handleSubmit">ADD</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import logger from "@/Services/Logging/logger.js";
const title = ref("");
const description = ref("");
const base_url = "http://localhost:5035/api/todos";

const emits = defineEmits(["newTodoSubmit"]);

async function handleSubmit() {
    try {
        await axios.post(base_url, {
            title: title.value,
            description: description.value,
        });
        // reset input box
        title.value = "";
        emits("newTodoSubmit");
    } catch (error) {
        logger.info("Error creating todos.");
        logger.error(error);
    }
}
</script>

<style>
.new-todo {
    margin: 1rem;
}
.new-todo input {
}

</style>