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
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const Navbar = () => {
    interface Task {
        title: string;
        description: string;
        taskType: string;
        category: string;
    }
    const { toast } = useToast()
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
        if (!title) {
            toast({
                title: "Error",
                description: "Title is required",
            });
            return;
        }
        if (title.length >= 30) {
            toast({
                title: "Error",
                description: "Title must be less than 30 characters",
            });
            return;
        }
        if (!description) {
            toast({
                title: "Error",
                description: "Description is required",
            });
            return;
        }
        if (description.length >= 100) {
            toast({
                title: "Error",
                description: "Description must be less than 100 characters",
            });
            return;
        }
        if (!category) {
            toast({
                title: "Error",
                description: "Category is required",
            });
            return;
        }

        addTask(newTask);
        setTitle('');
        setDescription('');
        setCategory('');
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4 w-full'>
            <Toaster />
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