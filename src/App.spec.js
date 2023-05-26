import '@testing-library/jest-dom'
import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import App from './App.vue'

describe("testing App", () => {
 
    test("checks if title is properly displayed", () => {
      render(App, { props: { } });
      expect(screen.getByText("Todos using Vue and redux-toolkit")).toBeInTheDocument();
      
    });
    test("checks adding and removing a new todo", async() => {
        const { container } = render(App, { props: { } });
        const input = container.querySelector('input');
        const add = screen.getByText('Add Todo')
        await userEvent.type(input, "test" );
        await userEvent.click(add);

        const elem = container.querySelector('ul li')
        const startsRight = elem.textContent.startsWith('test')
        const remove = elem.querySelector('button')
        expect(elem).toBeInTheDocument();
        expect(startsRight).toBeTruthy();
        await userEvent.click(remove);
        expect(elem).not.toBeInTheDocument(); 
    });
    
   
});