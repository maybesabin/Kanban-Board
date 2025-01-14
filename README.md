# Kanban Board

A feature-rich and responsive Kanban Board application built using Vite and React.js. This application allows users to organize tasks into columns, reflecting their progress from "To Do" to "Done." It is designed with performance and scalability in mind, making it a robust solution for task management.

---

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Technology Choices and Rationale](#technology-choices-and-rationale)
- [Known Limitations/Trade-offs](#known-limitationstrade-offs)
- [Future Improvements](#future-improvements)
- [Demo Video](#demo-video)

---

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/kanban-board.git
   cd kanban-board
   ```

2. **Install Dependencies:**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:5173` in your browser to view the application.

4. **Build for Production:**
   To create an optimized build, run:
   ```bash
   npm run build
   ```
   The output will be in the `dist` folder.

5. **Preview the Production Build:**
   ```bash
   npm run preview
   ```

---

## Technology Choices and Rationale

### **Vite:**
- Chosen for its fast build times and efficient development environment.
- Supports modern JavaScript and ensures optimized production builds.

### **React.js:**
- Provides a component-based structure, making it easier to manage state and UI updates.
- Well-suited for building interactive user interfaces like a Kanban board.

### **TailwindCSS:**
- Ensures scoped and maintainable styling.
- Provides rapid UI development with pre-defined classes.

### **Shadcn UI:**
- Provides a set of pre-built components for consistent styling.
- Ensures consistent styling across the application.

### **React Context API:**
- Provides a way to share data betweetn components without having o pass props down manually.
- Ensures that the data is shared between components efficiently.

### **Lucide React Icons:**
- Provides a set of pre-built icons for consistent styling.
- Ensures that the icons are consistent across the application.

---

## Known Limitations/Trade-offs

1. **State Management:**
   - Local state is used instead of a global state management library (e.g., Redux), which might limit scalability for larger projects.

2. **Backend Integration:**
   - Currently, there is no backend; all data is stored in the browser’s local storage, meaning data will be lost if the storage is cleared.

3. **Drag-and-Drop Complexity:**
   - Drag-and-drop implementation may not handle edge cases such as rapid task reordering or multi-touch gestures effectively due to the use of React's inbuilt drag and drop feature 
   - The reason to use inbuilt feature instead of libraries like react-beautiful-dnd is because it is not yet supported for the latest react version and had some issues.

4. **Responsive Design:**
   - While responsive, certain layouts might require further testing and optimization for smaller screen sizes.

---

## Future Improvements

1. **Backend Integration:**
   - Add a backend with a database to enable data storage.

2. **User Authentication:**
   - Allow users to create accounts and have personalized boards.

3. **Advanced Features:**
   - Add support for due dates, tags, and task priorities.
   - Enable searching of tasks within columns.

4. **Accessibility Enhancements:**
   - Improve keyboard navigation to ensure the app is accessible to all users.

5. **Performance Optimization:**
   - Optimize drag-and-drop operations for better performance with large datasets.

---

## Demo Video

[Watch the demo video here](https://drive.google.com/file/d/16QX0T6kmrrhkQ951tBZGHj3dkOC8GPmr/view)

