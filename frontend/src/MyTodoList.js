import React, { useState } from "react";
import axios from 'axios';
import { getNickName } from './jwtCheck.js';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

let FireNav = styled(List)({
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginLeft: 10,
    }
});

function MyTodoList() {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    let [todos, setTodos] = useState([]);
    let [todoDates, setTodoDates] = useState([]);

      // /api/todo/todolist (get, requestparam, nickname);

    axios.get('/api/todo/nickname', {
        params: {
            userNickname: userNickname
        }
    })
        .then(res => {
            setTodos(res.data);
            
            let arr = [];
            res.data.map(todo => {
                arr.push(todo.todoCreated)
            })
            setTodoDates([...new Set(arr)]);
        })
        .catch(err => {
            console.log(err);
        });

    return (
        <div>
            <h4 style={{ textAlign: 'left', margin: '1rem' }}>나의 Todo List</h4>
            {
                todoDates.map(todoDate => {
                    <Box sx={{ display: 'flex' }}>
                        <ThemeProvider
                            theme={createTheme({
                                palette: { mode: 'dark', background: { paper: 'rgb(5, 51, 52)' }, }
                            })}
                        >
                            <Paper elevation={0} sx={{ maxWidth: 256 }}>
                                <FireNav component="nav" >
                                    <ListItemButton>
                                        <ListItemText
                                            primary={todoDate}
                                            primaryTypographyProps={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                            }}
                                        />
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                    </ListItemButton>
                                    <Divider />
                                    <Box sx={{ bgcolor: 'rgba(114, 143, 143, 0.2)', }}>
                                        {todos
                                            .filter((todo, i) => todo.todoCreated == todoDate)
                                            .map((todo) => (
                                                <ListItem
                                                    key={todo.todoId}
                                                    secondaryAction={
                                                        <Checkbox
                                                            edge="end"
                                                            disabled={true}
                                                            checked={todo.todoCheck}
                                                        />
                                                    }
                                                    disablePadding
                                                >
                                                    <ListItemButton
                                                        key={todo.todoId}
                                                        sx={{ pt: 2, pb: 2 }}
                                                    >
                                                        <ListItemText
                                                            primary={todo.todoContent}
                                                            primaryTypographyProps={{
                                                                lineHeight: '15px'
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                    </Box>
                                    {/* {
                                        checkNum == todos.length
                                            ? <h4 style={{ padding: '15px', paddingBottom: '10px' }}>todo 완료✅</h4>
                                            : <h4 style={{ padding: '15px', paddingBottom: '10px' }}>
                                                {Math.round(checkNum / todos.length * 100)}% 완료</h4>
                                    } */}
                                </FireNav>
                            </Paper>
                        </ThemeProvider>
                    </Box>
                })
            }
            
        </div>
    );
}

export default MyTodoList;