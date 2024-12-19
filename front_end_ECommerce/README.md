## ---------------- install the all the below dependeies -------
1) npm install @reduxjs/toolkit@^2.2.7 axios@^1.7.4 class-variance-authority@^0.7.0 clsx@^2.1.1 lucide-react@^0.429.0 react@^18.3.1 react-dom@^18.3.1 react-redux@^9.1.2 react-router-dom@^6.26.1 tailwind-merge@^2.5.2 tailwindcss-animate@^1.0.7
2) Here’s a short description for each of the dependencies:
   1) Here’s a short description for each of the dependencies:

------------------------

### **1. `@reduxjs/toolkit`**
- **Purpose**: Simplifies state management in React applications using Redux.
- **Example Use**: Managing global state (e.g., user authentication, cart items).

---

### **2. `axios`**
- **Purpose**: A promise-based HTTP client for making API requests.
- **Example Use**: Fetching data from a REST API or sending POST requests.

---

### **3. `class-variance-authority`**
- **Purpose**: Utility for managing dynamic and conditional class names with variants.
- **Example Use**: Easily applying conditional Tailwind CSS classes based on props.

---

### **4. `clsx`**
- **Purpose**: Utility for conditionally joining class names.
- **Example Use**: Dynamically assigning CSS classes in a React component.

---

### **5. `lucide-react`**
- **Purpose**: Icon library for React with lightweight and customizable icons.
- **Example Use**: Adding icons (e.g., menu, user, or settings icons) to a UI.

---

### **6. `react`**
- **Purpose**: Core library for building user interfaces.
- **Example Use**: Creating reusable components and managing UI state.

---

### **7. `react-dom`**
- **Purpose**: Provides DOM-specific methods for rendering React components to the browser.
- **Example Use**: Mounting a React app into a `div` in the HTML file.

---

### **8. `react-redux`**
- **Purpose**: Official bindings for integrating Redux with React.
- **Example Use**: Connecting React components to the Redux store.

---

### **9. `react-router-dom`**
- **Purpose**: Enables routing and navigation in React applications.
- **Example Use**: Creating routes like `/home`, `/about`, or `/dashboard`.

---

### **10. `tailwind-merge`**
- **Purpose**: Utility for merging and overriding conflicting Tailwind CSS classes.
- **Example Use**: Dynamically resolving conflicting classes like `bg-red-500` and `bg-blue-500`.

---

### **11. `tailwindcss-animate`**
- **Purpose**: Plugin for adding pre-defined animations to Tailwind CSS.
- **Example Use**: Animating elements with classes like `animate-fade-in` or `animate-bounce`.

-----------------------------------
3) Add Tailwind and its configuration:
Install tailwindcss and its peer dependencies, then generate your tailwind.config.js and postcss.config.js files: by follow the below command
4) npm install -D tailwindcss postcss autoprefixer
5) npx tailwindcss init -p
6) Add this import header in your main css file, src/index.css in our case: below code
7) @tailwind base;
    @tailwind components;
    @tailwind utilities;

    /* ... */
8) Configure the tailwind template paths in tailwind.config.js: by follow the below code:
      1) /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
        theme: {
          extend: {},
        },
        plugins: [],
      }
9) Edit tsconfig.json file but we are using the js so, for that we need to create a file with same name as jsconfig.json then paste some code from that official website guild.
   1)  
                {
        "compilerOptions": {
            "baseUrl": ".",
            "paths": {
            "@/*": ["./src/*"]
            }
        }
        }

10) Update vite.config.ts/ js
Add the following code to the vite.config.ts so your app can resolve paths without error:
    1) export default defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
            "@": path.resolve(__dirname, "./src"),
            },
        },
        })

11) write the below command in your local to Run the shadcn-ui init command to setup your project:
    1)  npx shadcn@latest init
12) Configure components.json
    You will be asked a few questions to configure components.json:

    Which style would you like to use? › New York
    Which color would you like to use as base color? › Zinc
    Do you want to use CSS variables for colors? › no / yes
13) That's it You can now start adding components to your project.
    1) npx shadcn@latest add button
The command above will add the Button component to your project. You can then import it like this:

14) to run this front-end app use the : npm run dev
15) 



