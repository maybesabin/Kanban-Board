'use strict'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useTaskContext } from "@/contexts/taskContext";

const Form = ({ taskType }: { taskType: string }) => {
    interface Task {
        title: string;
        description: string;
        taskType: string;
        category: string;
    }

    const { addTask } = useTaskContext();

    //task submit
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const handleSubmit = () => {
        const newTask: Task = {
            title,
            description,
            taskType,
            category
        };
        if (title.length > 0 && title.length < 30 && description.length > 0 && description.length < 100 && taskType && category) {
            addTask(newTask);
            setTitle('');
            setDescription('');
            setCategory('');
        }
        throw new Error("Title must be between 1 and 30 characters");
    }
    return (
        <Sheet>
            <SheetTrigger>
                <CirclePlus className="w-6 h-6 cursor-pointer text-white fill-gray-500 hover:fill-gray-700" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add <span className="lowercase  ">{taskType}</span> task</SheetTitle>
                    <SheetDescription>
                        Fill up all the fields to add a new task to your board.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-12">
                        <Label htmlFor="name" className='text-sm'>
                            Title*
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-12">
                        <Label htmlFor="username" className='text-sm'>
                            Description*
                        </Label>
                        <textarea
                            style={{ resize: "none" }}
                            className="col-span-3 border p-2 outline-none rounded-md h-32"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-12">
                        <Label htmlFor="taskType" className='text-sm'>
                            Type*
                        </Label>
                        <div className="col-span-3">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder={taskType} />
                                </SelectTrigger>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-12">
                        <Label htmlFor="taskType" className='text-sm'>
                            Category*
                        </Label>
                        <div className="col-span-3">
                            <Select onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="work">Work</SelectItem>
                                    <SelectItem value="finance">Finance</SelectItem>
                                    <SelectItem value="school">School</SelectItem>
                                    <SelectItem value="household">Household</SelectItem>
                                    <SelectItem value="personal">Personal</SelectItem>
                                    <SelectItem value="fitness">Fitness</SelectItem>
                                    <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" onClick={handleSubmit}>Add task</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Form