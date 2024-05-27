<template>
    <div class="todo">
        <p class="todo-title">
            <input type="checkbox" v-model="done" checked="{{ done }}" @click="toggleCompleted"/>
            {{ props.todo.title }}
        </p>
    </div>
</template>

<script setup>

import { ref } from "vue";
import axios from "axios";
const base_url = "http://localhost:5035/api/todos";

const props = defineProps({
    todo: {
        type: Object,
        required: true,
        of: {
            title: String,
            done: Boolean,
            description: String,
            id: String,
        }
    }
});

const done = ref(props?.todo.done);
function toggleCompleted() {
    // Toggle
    done.value = !done.value;

    // Update in DB
    axios.put(base_url, {
        id: props?.todo.id,
        description: props?.todo.description,
        done: done.value,
        title: props?.todo.title,
    });
}

</script>