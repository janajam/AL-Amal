import { Dialog, DialogTitle, DialogContent, DialogContentText, Alert, TextField, TextareaAutosize, DialogActions, Button, CircularProgress } from "@mui/material";
import { useState } from "react";

const ComplaintsResponse = () => {
    
      const [open, setOpen] = useState(false)
      
  //for dialog 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const submitDialog = () => {
    // contactAdminMutation.mutate({
    //   contactEmail,
    //   contactAsk
    // })
    handleClose();
  };


  return (

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle sx={{
                fontSize: 20,
                color: "#1C6280",
                fontWeight: 700
              }}>Contact AdminStrator</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You can still reach us , please fill out our contact form here.
                  we will get back to you with your access details and any help you need .
                </DialogContentText>
                {/* {contactAdminMutation.isSuccess && (
                  <Alert variant="outlined" severity="success" sx={{ mb: 2 }}>
                    Message sent successfully
                  </Alert>
                )} */}

                {/* {contactAdminMutation.isError && (
                  <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
                    Sending failed. Please try again.
                  </Alert>
                )} */}

                <form
                  onSubmit={submitDialog}
                  id="subscription-form">
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    // onChange={(e) => setContactEmail(e.target.value)}
                  />

                  <TextareaAutosize
                    aria-label="Your Ask"
                    minRows={3}
                    name="ask"
                    placeholder="Your Ask "
                    style={{
                      width: '100%',
                      backgroundColor: '#E8F2F3',
                      border: 'none',
                      borderBottom: '1px solid #2B5A6C ',
                      fontSize: 16,
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderBottom = '2px solid #2B5A6C';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottom = '1px solid #2B5A6C';
                    }}

                    // onChange={(e) => setContactAsk(e.target.value)}

                  />

                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" form="subscription-form"
                
                  sx={{ bgcolor: "#1C6280", color: 'white' }}
                  startIcon={<CircularProgress/>}
                >
                </Button>
              </DialogActions>
            </Dialog>


  )
}

export default ComplaintsResponse

