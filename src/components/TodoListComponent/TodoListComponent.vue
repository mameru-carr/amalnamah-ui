
<template>
    <div class="center">
        <NewTodoComponent @new-todo-submit="onNewTodoSubmit"/>
    </div>
    <div class="center">
        <div class="todo-list">
            <TodoComponent v-for="(todo, index) in todos" :key="index" :todo="todo"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import TodoComponent from "../TodoComponent/TodoComponent.vue";
import NewTodoComponent from "@components/NewTodoComponent/NewTodoComponent.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import logger from "@/services/logger/logger.ts";

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

<style>
.center {
    display: flex;
    place-content: center;
}
.todo-list {
    max-width: 80vw;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
}
</style>

