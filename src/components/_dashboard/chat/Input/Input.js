/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Stack from '@material-ui/core/Stack';

const Input = ({ onSendMessage }) => {
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = () => {
        setText('');
        onSendMessage(text);
    };

    return (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} >
            <TextField
                label="Type your message here..."
                placeholder="Enter your message and press ENTER"
                onChange={(e) => onChange(e)}
                value={text}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        onSubmit(text);
                    }
                }}
                style={{ height: '25px', width: '90%' }}
            />
            <Box width="1%" />
            <Button variant="contained" color="primary" onClick={onSubmit} style={{ width: '5%' }}>
                Send
            </Button>
        </Stack>
    );
};

export default Input;
