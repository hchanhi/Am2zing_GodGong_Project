import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './Header.js';
import Home from './Home.js';
import Challenge from './Challenge.js'
import Login from './Login.js';
import Join from './Join.js';
import TodoList from './Todo/TodoList.js';
import TodoStudy from './Todo/TodoStudy.js';
import Footer from './Footer.js';

function App() {

    return (
        <div className="App">
            <Header />

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/challenge" element={<Challenge />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Join" element={<Join />} />
                <Route path="/todoList" element={<TodoList />} />
                <Route path="/todoStudy/:id" element={<TodoStudy />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;