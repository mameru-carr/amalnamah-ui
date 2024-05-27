
<template>
    <TodoComponent v-for="(todo, index) in todos" :key="index" :todo="todo"/>
    <NewTodoComponent @new-todo-submit="onNewTodoSubmit"/>
</template>

<script setup>
import TodoComponent from "../TodoComponent/TodoComponent.vue";
import NewTodoComponent from "@/components/NewTodoComponent/NewTodoComponent.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import logger from "@/Services/Logging/logger.js";

const base_url = "http://localhost:5035/api/todos";
const todos = ref([]);
onMounted(async () => {
    try {
        const response = await axios.get(base_url);
        todos.value = response.data;
    } catch (error) {
        logger.info("Error fetching todos.");
        logger.error(error);
    }
});

async function onNewTodoSubmit() {
    const response = await axios.get(base_url);
    todos.value = response.data;
}
</script>

