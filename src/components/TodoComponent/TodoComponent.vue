<template>
    <div class="todo">
        <p class="todo-title">
            <input type="checkbox" v-model="done" checked="{{ done }}" @click="done=!done"/>
            {{ props.todo.title }}
        </p>
    </div>
</template>

<script setup>

import { ref } from "vue";

const props = defineProps({
    todo: {
        type: Object,
        required: true,
        of: {
            title: String,
            done: Boolean
        }
    }
});

const done = ref(props?.todo.done);

</script>