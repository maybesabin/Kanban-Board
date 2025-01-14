'use strict'

import { Plus, LayoutGrid } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import { useState } from 'react'
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
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { useTaskContext } from '@/contexts/taskContext'
import Filters from './Filters'

const Navbar = () => {
    interface Task {
        title: string;
        description: string;
        taskType: string;
        category: string;
    }

    const { addTask } = useTaskContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskType, setTaskType] = useState('');
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
            setTaskType('');
            setCategory('');
        }
        throw new Error("Title must be between 1 and 30 characters");
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4 w-full'>
            <div
                className="flex items-center justify-between w-full">
                <div
                    className='flex items-center gap-2'>
                    <LayoutGrid className='w-8 h-8' />
                    <span className='text-neutral-800 text-4xl font-semibold'>Kanban</span>
                </div>
                <Sheet>
                    <SheetTrigger>
                        <Button variant={"outline"}
                            className="flex items-center justify-center gap-2">
                            <Plus className='w-4 h-4' />
                            New task
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Add new task</SheetTitle>
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
                                    <Select onValueChange={setTaskType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select task type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="To Do">To Do</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                            <SelectItem value="In Review">In Review</SelectItem>
                                            <SelectItem value="Done">Done</SelectItem>
                                        </SelectContent>
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
            </div>

            {/* Filters */}
            <Filters />

        </div >
    )
}

export default Navbar