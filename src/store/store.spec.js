// @ts-nocheck
import { test, describe, expect, vi } from "vitest";
import store from './store'
import {
    addTodo,
    removeTodo,
    fetchRandomTodo
} from "./slices/todoSlice";
  
vi.mock("./slices/todoSlice", async () => {
    const actual = await vi.importActual("./slices/todoSlice")
    return {
        ...actual,
        fetchRandomTodo: vi.fn(()=> 'api test'),
    }
})

describe("testing todo slice in the store ", () => {
    test("checks if initial state is properly inited", () => {
        it('Should initially set todos to an empty array', () => {
            const state = store.getState().todos
            expect(state.todos).toEqual([])   
        })
    });
    test("Creates and Deletes a new test Todo", () => {
        it('Creates a new test Todo', async() => {
            const state = await store.dispatch(addTodo('test'))           
            expect(state.todos.lenght).toEqual(1)
            expect(state.todos[0]).toEqual('test')
        })
        it('Removes the test Todo', async() => {
            expect(state.todos.lenght).toEqual(1)
            const state = await store.dispatch(removeTodo('test'))           
            expect(state.todos.lenght).toEqual(0)
            expect(state.todos).toEqual([])
        })
    });
    test("Creates and Deletes a new api Todo", () => {
        it('Creates the api call Todo', async() => {    
            const state = await store.dispatch(fetchRandomTodo())           
            expect(state.todos.lenght).toEqual(1)
            expect(state.todos[0]).toEqual('api test')
        })
        it('Removes the api call Todo', async() => {
            expect(state.todos.lenght).toEqual(1)
            const state = await store.dispatch(removeTodo('api test'))           
            expect(state.todos.lenght).toEqual(0)
            expect(state.todos).toEqual([])
        })
    }); 
});