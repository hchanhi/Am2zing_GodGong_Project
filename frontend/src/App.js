import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './Header.js';
import Home from './Home.js';
import Login from './Login.js';
import Signin from './Signin.js';
import TodoList from './Todo/TodoList.js';
import TodoStudy from './Todo/TodoStudy.js';
import Challenge from './Challenge'; //hee
import Footer from './Footer.js';

function App() {

    return (
        <div className="App">
            <Header />

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/todoList" element={<TodoList />} />
                <Route path="/todoStudy/:id" element={<TodoStudy />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;