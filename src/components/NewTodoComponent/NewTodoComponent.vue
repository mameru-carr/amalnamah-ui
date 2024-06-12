<template lang="pug">
.new-todo
    input#title-input(v-model="title" placeholder="Enter Title" required type="text")
    input#description-input(v-model="description" placeholder="Enter Description" type="text")
    button(@click="handleSubmit") ADD
</template>

<script lang="ts" setup>
import {ref} from "vue";
import axios from "axios";
import logger from "@logger/logger";

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
</style>