import { render, screen, waitFor } from "@testing-library/react";
import * as taskService from "../../services/tasksService";
import { Task } from "../../types/task";
import { TaskManager } from "../TaskManager";

jest.mock("@/services/tasksService"); // заменим функции моками

describe("TaskManager", () => {
    const mockedTasks: Task[] = [
        { id: "1", title: "Test Task 1", completed: false },
        { id: "2", title: "Test Task 2", completed: true },
    ];

    beforeAll(() => {
        window.HTMLElement.prototype.scrollIntoView = function () { };
    });

    beforeEach(() => {
        (taskService.getTasks as jest.Mock).mockResolvedValue(mockedTasks);
    });

    it("renders tasks from the mocked API", async () => {
        render(<TaskManager />);

        await waitFor(() => {
            expect(screen.getByText("Test Task 1")).toBeInTheDocument();
            expect(screen.getByText("Test Task 2")).toBeInTheDocument();
        });
    });
});