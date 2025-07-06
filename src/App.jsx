import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';  
import Popover from '@mui/material/Popover';
import Modal from '@mui/material/Modal';
import SaveAltTwoToneIcon from '@mui/icons-material/SaveAltTwoTone';


const style = 
  {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function App() {
  const [name] = useState(["Apple", "Banana", "Strawberry", "Blueberry"]);
  const [count, setCount] =  useState(0);
  const [checked, setChecked] = React.useState([true, true, true, true]);
  const [trigger, setTrigger] = useState(false);
  const [quantityCount, setQuantityCount] = useState([0,0,0,0]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [openModal, setOpen] = React.useState(false);


  const handleOpen = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleClick = () => 
  {
    setAnchorEl(document.body);
  };

  const handleClose = () => 
  {
    setAnchorEl(null);
  };

  const handleIncrement = index => () =>
  {
    const tempValue = quantityCount.slice();

    if (quantityCount[index] <= 10)
    {
      tempValue[index] = quantityCount[index] + 1;
      setQuantityCount(tempValue);
    }
  }

  const handleDecrement = index => () =>
  {
    const tempValue = quantityCount.slice();
    if (quantityCount[index] > 1)
    {
      tempValue[index] = quantityCount[index] - 1;
      setQuantityCount(tempValue);
    }
  }

  const handleChange = index => event => 
  {
    const tempChecked = checked.slice();
    tempChecked[index] = !(event.target.checked);
    setChecked(tempChecked);

    if (tempChecked[index] == false)
    {
      handleIncrement(index)();
    }
    else
    {
      quantityCount[index] = 0
    }
  }

  const requestOptions =
  {
    method: "GET",
    redirect: "follow"
  };

  // useEffect(() =>
  // {
  //   let temp = 0;
  //   for (let i = 0; i < checked.length; i++)
  //   {
  //     if (checked[i] == false)
  //     {
  //       fetch("/api/" + name[i], requestOptions)
  //       .then(response => response.json())
  //       .then(data => 
  //       {
  //         temp += (data.nutritions.sugar * quantityCount[i]);
  //       })
  //       .catch(error => console.log('error', error))
  //       .finally(() => 
  //         {
  //           setCount(temp);
  //       });
  //     }
  //   }
  // },[trigger]);

  function fetchFruit()
  {
    let temp = 0;
    for (let i = 0; i < checked.length; i++)
    {
      if (checked[i] == false)
      {
        fetch("/api/" + name[i], requestOptions)
        .then(response => response.json())
        .then(data => 
        {
          temp += (data.nutritions.sugar * quantityCount[i]);
        })
        .catch(error => console.log('error', error))
        .finally(() => 
          {
            setCount(temp);
          });
      }
    }
  }

  return (
    <>  
      <Typography variant="h1" display="flex" justifyContent="center" sx={{ bgcolor:'#fce5dd', width: 'fit-content', borderRadius: 2, px: 4, textAlign: 'center', mx: 'auto', mb: 3, ml: 55}} alignItems="center">
        Fruit Basket!
       </Typography>

      <Box display="flex" bgcolor='#fce5dd' justifyContent="center" alignItems="center" marginLeft={30} flexDirection="column" sx={{ borderRadius: 7, p: 4}}>
        
        <FormGroup row sx={{columnGap: 4}}>
          <FormControlLabel control={<Checkbox onChange={handleChange(0)}/>}
            label=
            {
              <img src="https://www.iconpacks.net/icons/2/free-apple-icon-3155-thumb.png" alt="apple icon" width="150"/>
            }
          />

          <FormControlLabel control={<Checkbox onChange={handleChange(1)}/>}
            label=
            {
              <img src="https://cdn-icons-png.flaticon.com/512/6482/6482627.png" alt="banana icon"  width="150"/>
            }
          /> 

          <FormControlLabel control={<Checkbox onChange={handleChange(2)}/>}
            label=
            {
              <img src="https://cdn-icons-png.flaticon.com/512/5210/5210447.png" alt="strawberry icon"  width="150"/>
            }
          />

          <FormControlLabel control={<Checkbox onChange={handleChange(3)}/>}
            label=
            {
              <img src="https://cdn-icons-png.flaticon.com/512/5210/5210493.png" alt="blueberry icon"  width="150"/>
            }
          /> 
        </FormGroup>
        
        {/* Thank god for stack overflow for this bc material ui wasn't working */}
        <ButtonGroup size="large" aria-label="small outlined button group" sx={{ marginTop: 2}}>
          <Button variant="outlined" onClick={handleDecrement(0)}>-</Button>
          <Button display="true">{quantityCount[0]}</Button>
          <Button variant="outlined" onClick={handleIncrement(0)} sx={{marginRight:10}}>+</Button>

          <Button variant="outlined" onClick={handleDecrement(1)}>-</Button>
          <Button display="true">{quantityCount[1]}</Button>
          <Button variant="outlined" onClick={handleIncrement(1)}sx={{marginRight:10}}>+</Button>

          <Button variant="outlined" onClick={handleDecrement(2)}>-</Button>
          <Button display="true">{quantityCount[2]}</Button>
          <Button variant="outlined" onClick={handleIncrement(2)} sx={{marginRight:10}}>+</Button>

          <Button variant="outlined" onClick={handleDecrement(3)}>-</Button>
          <Button display="true">{quantityCount[3]}</Button>
          <Button variant="outlined" onClick={handleIncrement(3)} sx={{marginRight:10}}>+</Button>
        </ButtonGroup>
          
        <Button variant="outlined" sx= {{
          mt: 7,
          mr: 20,
          borderColor: 'black',
          color: 'black',
          '&:hover': {
            backgroundColor: '#fa5081',
          },
        }}
        endIcon={<SaveAltTwoToneIcon/>} 
          onClick={event => {fetchFruit()}}>
          Save
        </Button>

        <Button variant="contained" sx= {{
          mt: -4.5,
          ml: 14,
          backgroundColor: '#fa5081',       
          color: 'black',                
          borderColor: 'black',          
          border: '1px solid black',     
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
        
        endIcon={<ArrowForwardIcon/>} 
          onClick={event => {
            if (count > 70)
            {
              handleClick(event);
              setCount(0);
            }
            else
            {
              handleOpen();
            }
          }}>
          Confirm
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',}}
        >
          <Typography sx={{p: 2}}>That's too much sugar!</Typography>
        </Popover>

        <Modal
          open={openModal}
          onClose={closeModal}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Your fruit bowl has {count}g of sugar! 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              This is very healthy, but remember that too much sugar can be bad for you.
            </Typography>
          </Box>
        </Modal>

      </Box>
      
      
      {/* displays nutrition facts 12:26pm */}
      {console.log("Total Sugar: " + count)};

      {/* successfully grabbed data 1:47pm */}
      {/* <Typography variant="h4" component="h1">
        <li className="list-group-item" key={fruitName.calories}>{fruitName.calories}</li>
      <li className="list-group-item" key={fruitName.sugar}>{fruitName.sugar}</li>
      </Typography>  */}
      


    </>
  );
}

export default App


