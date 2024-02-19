import Image from "next/image";
import { Inter } from "next/font/google";
import {
  CheckSquare,
  CheckSquareOffset,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { todo } from "node:test";
import { Label } from "@/components/ui/label";

const inter = Inter({ subsets: ["latin"] });

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const todos: Todo[] = [];

export default function Home() {
  const [taskValue, setTaskValue] = useState<string>("");
  const [taskEditValue, setTaskEditValue] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>(todos);
  const [taskPlaceholder, setTaskPlaceholder] =
    useState<string>("Add a new task...");

  const createNewTask = (_formEvent: { preventDefault: () => void }) => {
    if (!taskValue) {
      _formEvent.preventDefault();
      setTaskPlaceholder("Please enter a task...");
    } else {
      const newTask: Todo = {
        id: todoList.length + 1,
        task: taskValue,
        completed: false,
      };
      setTodoList([...todoList, newTask]);
      setTaskValue("");
      setTaskPlaceholder("Add a new task...");
      _formEvent.preventDefault();
    }
  };

  const deleteTask = (id: number) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
  };

  const editTask = (id: number) => {
    const itemToEdit = todoList.filter((item) => item.id === id);
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    const editedItem: Todo = {
      id: id,
      task: itemToEdit[0].task,
      completed: itemToEdit[0].completed,
    };
  };

  return (
    <main className="bg-black flex flex-col h-screen">
      <header className="sticky top-0 p-2 m-0 w-full flex flex-row flex-initial border-b-1 border-zinc-800">
        <div className="grow flex flex-row justify-center items-center gap-3">
          <CheckSquareOffset size={32} className="text-white" />
          <h1 className="text-white text-3xl font-inter text-center">
            TodoZen
          </h1>
        </div>
      </header>
      <div className="flex flex-col h-screen items-center justify-center overflow-auto scrollbar-hide">
        <div className="flex flex-col border-1 border-white rounded-sm w-[40%] min-h-[60%] max-h-[80%]">
          <Table className="max-h-[60%]">
            <TableHeader>
              <TableRow className="hover:bg-inherit">
                <TableHead>Task</TableHead>
                <TableHead className="w-[100px]">Completion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="scrollbar-hide">
              {todoList.map((item) => (
                <TableRow key={item.id} className="text-white hover:bg-inherit">
                  <TableCell>{item.task}</TableCell>
                  <TableCell>
                    {item.completed ? "Completed" : "Incomplete"}
                  </TableCell>
                  <TableCell className="w-[48px] ml-0 pl-0">
                    <Popover>
                      <PopoverTrigger asChild>
                        <PencilSimple
                          size={16}
                          className="text-white cursor-pointer"
                          onClick={(e) => {
                            editTask(item.id);
                          }}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="bg-zinc-900">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none text-white">
                              Edit task
                            </h4>
                            <p className="text-sm text-muted-foreground text-zinc-400">
                              Change task details.
                            </p>
                          </div>
                          <form
                            onSubmit={(e) => {
                              alert(`Task updated to ${taskEditValue}`);
                              e.preventDefault();
                            }}
                            className="grid grid-cols-4 items-center gap-2 font-inter text-white"
                          >
                            <Label htmlFor="taskName">Task</Label>
                            <Input
                              id="taskName"
                              defaultValue={item.task}
                              className="col-span-3 h-8"
                              onChange={(e) => {setTaskEditValue(e.target.value)}}
                            />
                            <Button
                              className="bg-zinc-800 col-span-4 hover:bg-zinc-700"
                              type="submit" >
                                Save
                              </Button>
                          </form>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell className="w-[48px] ml-0 pl-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Trash
                          size={16}
                          className="text-white cursor-pointer"
                        />
                      </DialogTrigger>
                      <DialogContent className="bg-zinc-900 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-white">
                            Delete Task
                          </DialogTitle>
                          <DialogDescription className="text-zinc-400">
                            Are you sure you want to delete this task?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            className="bg-zinc-800 hover:bg-zinc-700"
                            onClick={(e) => {
                              deleteTask(item.id);
                            }}
                          >
                            Delete
                          </Button>
                          <DialogClose asChild>
                            <Button className="bg-transparent border-1 hover:bg-zinc-700">
                              Cancel
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="mb-2" />
          <form
            onSubmit={createNewTask}
            className="flex flex-row p-3 justify-center gap-2 sticky top-[100%]"
          >
            <Input
              className="max-w-[60%] text-white"
              placeholder={taskPlaceholder}
              value={taskValue}
              onChange={(e) => {
                setTaskValue(e.target.value);
              }}
            />
            <Button className="bg-zinc-800" type="submit">
              Add
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
