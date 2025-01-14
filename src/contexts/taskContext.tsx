'use strict'

import { createContext, useContext, useEffect, useState } from "react";
import { Briefcase, Dumbbell, Grid2X2, Home, School, User, Wallet } from "lucide-react";

interface Task {
    title: string;
    description: string;
    taskType: string;
    category: string;
}

interface Icon {
    name: string;
    icon: React.ReactNode;
    color: string;
}

interface TaskContextType {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    icons: Icon[];
    addTask: (task: Task) => void;
    deleteTask: (task: Task) => void;
    handleUndo: () => void;
    handleRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    toggleLayout: string;
    setToggleLayout: (layout: string) => void;
    taskFilter: string;
    setTaskFilter: (filter: string) => void;
    filteredTasks: Task[];
}

const taskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {

    //storing tasks in local storage
    const [tasks, setTasksState] = useState<Task[]>(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    //storing history for undo/redo
    const [history, setHistory] = useState<Task[][]>([tasks]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Update localStorage when tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    //relative icons for task category
    const icons = [
        { name: "Work", icon: <Briefcase className="w-4 h-4" />, color: "bg-green-100" },
        { name: "Finance", icon: <Wallet className="w-4 h-4" />, color: "bg-blue-100" },
        { name: "School", icon: <School className="w-4 h-4" />, color: "bg-red-100" },
        { name: "household", icon: <Home className="w-4 h-4" />, color: "bg-purple-100" },
        { name: "Personal", icon: <User className="w-4 h-4" />, color: "bg-orange-100" },
        { name: "Fitness", icon: <Dumbbell className="w-4 h-4" />, color: "bg-yellow-100" },
        { name: "Miscellaneous", icon: <Grid2X2 className="w-4 h-4" />, color: "bg-gray-100" },
    ];

    // Helper function to add to history
    const addToHistory = (newTasks: Task[]) => {
        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push([...newTasks]);
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
        setTasksState(newTasks);
    };

    // Modified setTasks to track history
    const setTasks = (newTasks: Task[]) => {
        addToHistory([...newTasks]);
    };

    const addTask = (task: Task) => {
        const newTasks = [...tasks, task];
        addToHistory(newTasks);
    };

    const deleteTask = (task: Task) => {
        const newTasks = tasks.filter((t) => t.title !== task.title);
        addToHistory(newTasks);
    };

    const handleUndo = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setTasksState(history[currentIndex - 1]);
        }
    };

    const handleRedo = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setTasksState(history[currentIndex + 1]);
        }
    };

    const canUndo = currentIndex > 0;
    const canRedo = currentIndex < history.length - 1;

    //board layout
    const [toggleLayout, setToggleLayout] = useState<string>("grid")

    //task filtering
    const [taskFilter, setTaskFilter] = useState<string>("All Categories");

    const filteredTasks = tasks.filter((task) => {
        if (taskFilter === "All Categories") return true;
        return task.category.toLowerCase() === taskFilter.toLowerCase();
    });

    return (
        <taskContext.Provider
            value={{
                tasks,
                setTasks,
                icons,
                addTask,
                deleteTask,
                handleUndo,
                handleRedo,
                canUndo,
                canRedo,
                toggleLayout,
                setToggleLayout,
                taskFilter,
                setTaskFilter,
                filteredTasks
            }}
        >
            {children}
        </taskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(taskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};