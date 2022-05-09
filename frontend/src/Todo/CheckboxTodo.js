import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

const data = [
    {  label: 'Authentication' },
    { label: 'Database' },
    { label: 'Storage' },
    { label: 'Hosting' },
];

const FireNav = styled(List)({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

function CheckboxTodo() {
    return (
        <Box sx={{ display: 'flex' }}>
            <ThemeProvider
                theme={createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {
                                disableTouchRipple: true,
                            },
                        },
                    },
                    palette: {
                        mode: 'dark',
                        primary: { main: 'rgb(102, 157, 246)' },
                        background: { paper: 'rgb(5, 30, 52)' },
                    },
                })}
            >
                <Paper elevation={0} sx={{ maxWidth: 256 }}>
                    <FireNav component="nav" disablePadding>
                        <ListItemButton
                            sx={{
                                pt: 2.5,
                                pb: 2.5,
                            }}
                        >
                            <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                            <ListItemText
                                primary="닉네임의 Todos"
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    letterSpacing: 1,
                                    lineHeight: '20px',
                                }}
                            />
                        </ListItemButton>
                        <Divider />
                        <Box
                            sx={{
                                bgcolor: 'rgba(71, 98, 130, 0.2)',
                                pb: 2
                            }}
                        >
                            {data.map((item) => (
                                    <ListItemButton
                                        alignItems="flex-start"
                                        key={item.label}
                                        sx={{
                                            px: 3,
                                            pt: 2.5,
                                            pb: 2.5,
                                            minHeight: 32
                                        }}
                                >
                                    
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontSize: 15,
                                                fontWeight: 'medium',
                                                lineHeight: '10px',
                                                mb: '2px',
                                            }}
                                        />
                                    </ListItemButton>
                                ))}
                        </Box>
                        <h4 style={{padding: '1rem'}}>현재 진행 중 ... (50%)</h4>
                    </FireNav>
                </Paper>
            </ThemeProvider>
        </Box>
    );
}


export default CheckboxTodo;
