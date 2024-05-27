<template>
    <div class="todo">
        <template v-if="editMode">
            <div class="edit-todo">
                <label><input v-model="done" checked="{{ done }}" type="checkbox" @click="toggleCompleted"/> Mark As
                    Completed </label>
                <label>Title: </label> <input v-model="title" type="text"/>
                <label>Description: </label> <input v-model="description" type="text"/>
                <button class="save-btn" @click="editTodo">Save</button>
                <button class="cancel-btn" @click="toggleEditMode">Cancel</button>
            </div>
        </template>
        <template v-else>
            <div class="todo-list-item">
                <label class="completed-label">
                    <input v-model="done" checked="{{ done }}" class="completed-checkbox"
                           type="checkbox" @click="toggleCompleted"/>
                    Mark As Completed
                </label>
                <p class="title">{{ todo.title }}</p>
                <p class="description">{{ todo.description }}</p>
                <button class="edit-btn" @click="toggleEditMode">Edit</button>
                <!--                <button @click="deleteTodo">Delete</button>-->
            </div>
        </template>
    </div>
</template>

<script setup>

import {ref} from "vue";
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

const editMode = ref(false);

const done = ref(props?.todo.done);
const completedOn = ref(new Date()); // change later
const title = ref(props?.todo.title);
const description = ref(props?.todo.description);
const todo = ref({
    id: props?.todo.id,
    title: props?.todo.title,
    description: props?.todo.description,
    done: props?.todo.done,
    // completedOn: props?.todo.completedOn,
});

function toggleEditMode() {
    editMode.value = !editMode.value;
}

function editTodo() {

    todo.value = {
        ...todo.value,
        title: title.value,
        description: description.value,
        done: done.value,
    }
    axios.put(base_url, todo.value);

    editMode.value = false;
}

function toggleCompleted() {
    // Toggle
    done.value = !done.value;
    todo.value = {
        ...todo.value,
        done: done
    }
    if (done.value) {
        completedOn.value = new Date();
    }

    // Update in DB
    axios.put(base_url, todo.value);
}

</script>

<style>
.todo-list-item, .edit-todo {
    border: 0.125rem solid black;
    border-radius: 0.25rem;
    padding: 1rem;
}

.title {
    font-family: "Alegreya", "Georgia", serif;
    font-weight: bold;
    font-size: 1.5rem;
}

.description {
    font-size: 1rem;
}

</style>