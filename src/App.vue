<script setup>
import { ref, onMounted } from 'vue'
import {
  todoSelectors,
  addTodo,
  removeTodo,
  fetchRandomTodo
} from "./store/slices/todoSlice";
import { store, useSelector } from "./store/store";
  const newTodo = ref(null);
  const todoList = ref(null)
  const todoListLoading =ref(null)
  
  onMounted(()=>{
    todoList.value = useSelector(
        todoSelectors.todos,
        newList => (todoList.value = newList)
    )
    todoListLoading.value = useSelector(
        todoSelectors.loading,
        newLoading => (todoListLoading.value = newLoading)
    )
  })

</script>

<template>
  <main class="text-center">
  <h1 class="text-2xl text-red-400 uppercase font-light my-2">Todos using Vue and redux-toolkit</h1>
  <hr class="my-2"/>
  <div class="flex justify-center">
    <input class="border" v-model="newTodo" />
    <button class="text-gray-200 bg-gray-800 ml-2 px-2 hover:bg-gray-200 hover:text-gray-800" @click="() => store.dispatch(addTodo(newTodo))">Add Todo</button>
  </div>
  
  <button class="btn" @click="() => store.dispatch(fetchRandomTodo())">
    Add Random Todo (API)
  </button>
  <h1 v-if="todoListLoading">Loading...</h1>
  <ul>
    <li v-for="(todo, idx) in todoList" :key="idx">
      {{ todo }}
      <button class="btn" @click="() => store.dispatch(removeTodo(todo))">
        Remove
      </button>
    </li>
  </ul>
</main>
</template>


