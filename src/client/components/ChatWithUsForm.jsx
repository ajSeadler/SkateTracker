import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const RootContainer = styled('div')({
  backgroundColor: '#000',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  maxWidth: '100vw',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#fff',
});

const StyledForm = styled('form')({
  width: '25%',
  marginTop: '16px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '16px',
  backgroundColor: '#fff',
  width: '100%',
  borderRadius: '10px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#999',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#333',
    fontWeight: 300,
  },
});

const StyledButton = styled(Button)({
  width: '100%',
  fontWeight: 'bold',
  backgroundColor: '#fff',
  color: '#000',
  '&:hover': {
    backgroundColor: '#eee',
  },
});

const ChatWithUsForm = () => {
  return (
    <RootContainer>
      <h2 style={{ fontWeight: 400, margin:'5px' }}>Contact Us</h2>
      <p style={{ fontWeight: 300, margin:'5px', padding:'10px' }}>
        Feel free to reach out to us with any questions, comments, or inquiries you may have. We're here to help!
      </p>
      <StyledForm>
        <StyledTextField
          label="Your Name"
          variant="outlined"
        />
        <StyledTextField
          label="Email Address"
          variant="outlined"
        />
        <StyledTextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
        />
        <StyledButton variant="contained">Send Message</StyledButton>
      </StyledForm>
      <p style={{ fontWeight: 300, padding:'10px', margin:'5px' }}>
        Alternatively, you can also reach us via email at <strong>info@mistymountainmusic.com</strong> or give us a call at{' '}
        <strong>(123) 456-7890</strong>.
      </p>
    </RootContainer>
  );
};

export default ChatWithUsForm;
