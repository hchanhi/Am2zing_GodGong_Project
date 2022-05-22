import React, { useState } from 'react';
import TodoModal from './TodoModal.js';
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

// let todos = ['멋지게 밥먹기', '끝내주게 숨쉬기', '알람끄고 잘자기', '코딩하기...'];

let FireNav = styled(List)({
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginLeft: 10,
    }
});

function CheckboxTodo({ nickname, client, todos }) {

    //todos에서 todoContent랑 todoCheck만 꺼내서 써야함

    let [checkNum, setCheckNum] = useState(0);
    let [checked, setChecked] = useState([]);
    let [modalOpen, setModalOpen] = useState(false);

    let handleToggle = (todo) => () => {
        let currentIndex = checked.indexOf(todo);
        let newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(todo);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        try {
            client.publish({
                destination: '/pub/todo/check',
                body: JSON.stringify(todo)
            });
        } catch (err) {
            console.log(err.message);
        }

        setCheckNum(newChecked.length);
        setChecked(newChecked);

        if (newChecked.length == todos.length) {
            setModalOpen(true)
            
        }
    };

    //투두 체크할때마다 messagemapping + 남의투두 체크 못하게 비활성화

    return (
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
                                primary={nickname + "의 Todo"}
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                }}
                            />
                            <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                        </ListItemButton>
                        <Divider />
                        <Box sx={{ bgcolor: 'rgba(114, 143, 143, 0.2)', }}>
                            {todos.map((todo) => (
                                <ListItem
                                    key={todo.todoId}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(todo.todoContent)}
                                            checked={checked.indexOf(todo.todoContent) !== -1}
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
                                                lineHeight: '10px'
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </Box>
                        <h4 style={{ padding: '15px', paddingBottom: '10px' }}>
                            현재 진행 중 ... ({Math.round(checkNum / todos.length * 100)}%)
                        </h4>
                    </FireNav>
                </Paper>
            </ThemeProvider>
            {
                modalOpen && <TodoModal
                    task='complete'
                    open={modalOpen}
                    setOpen={setModalOpen} />
            }
        </Box>
    );
}


export default CheckboxTodo;
