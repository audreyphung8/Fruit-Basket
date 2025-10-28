import * as React from 'react';
import Box from '@mui/material/Box';
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
import { useEffect } from 'react';

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

function App() 
{
  {/* Arrays to keep track of all fruits and their data, the indexes correlate to a specific fruit*/}
  const [name] = useState(["Apple", "Banana", "Strawberry", "Blueberry", "Grape", "Orange"]);
  const [count, setCount] =  useState(0);
  const [checked, setChecked] = React.useState([true, true, true, true, true, true]);
  const [trigger, setTrigger] = useState(false);
  const [quantityCount, setQuantityCount] = useState([0,0,0,0,0,0]);
  const [trackLimit, setTrackLimit] = useState(true);

  const [openModal, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const closeModal = () => setOpen(false);

  {/* Increases the quantity based on when the "+" has been clicked  */}
  const handleIncrement = index => () =>
  {
    const tempValue = quantityCount.slice();

    {/* Makes sure that the specific fruit (which is tracked by index) is updated and clicks cannot exceed 10*/}
    if (quantityCount[index] < 99)
    {
      tempValue[index] = quantityCount[index] + 1;
      setQuantityCount(tempValue);
    }
  }

  {/* Handles decreasing the quantity based on when the "-" has been clicked */}
  const handleDecrement = index => () =>
  {
    const tempValue = quantityCount.slice();
    {/* When quantity == 1 then the user must uncheck the icon */}
    if (quantityCount[index] > 1)
    {
      tempValue[index] = quantityCount[index] - 1;
      setQuantityCount(tempValue);
    }
  }

  {/* Negates the boolean value as an indicator that the checkbox has been clicked */}
  const handleChange = index => event => 
  {
    const tempChecked = checked.slice();
    tempChecked[index] = !(event.target.checked);
    setChecked(tempChecked);

     {/* Ensures that when the checkbox is checked so does the button value */}
    if (tempChecked[index] == false)
    {
      handleIncrement(index)();
    }
    else {/*If bool = true, it means that the box has been unchecked so the quantity gets reset */}
    {
      quantityCount[index] = 0
    }
  }

  const requestOptions =
  {
    method: "GET",
    redirect: "follow"
  };

  function fetchFruit() 
  {
    let temp = 0;
    const track_fetch_requests = [];

    for (let i = 0; i < checked.length; i++) 
    {
      if (checked[i] === false) 
      {
        const promise = fetch("/api/" + name[i], requestOptions)
          .then(response => response.json())
          .then(data => {
            temp += data.nutritions.sugar * quantityCount[i];
          })
          .catch(error => console.log('error', error));
        
        track_fetch_requests.push(promise);
      }
    }

    Promise.all(track_fetch_requests).then(() => 
    {
      setCount(temp);

      if (temp > 70)
      {
        setTrackLimit(false);
      }
      else
      {
        setTrackLimit(true);
        handleOpen();
      }
    });
  }
    

  return (
    <> 
      {!trigger &&
        <Box display="flex" justifyContent="center" alignItems="center" sx={{bgcolor: '#fce5dd', width: 'fit-content', borderRadius: 2, px: 4, mx: 'auto', mb: 3}}>     
          <Typography variant="h1" sx={{ textAlign: 'center', mr: 2, fontFamily: 'Gambetta',fontWeight: 'bold' }}>
            Fruit Basket!
          </Typography>
          <img src="https://cdn-icons-png.flaticon.com/512/5601/5601378.png" width="100"></img>
        </Box>
      }

      {!trigger &&
        <Box display="flex" bgcolor='#fce5dd' justifyContent="center" alignItems="center" marginLeft={20} marginRight={15} flexDirection="column" sx={{ borderRadius: 7, p: 4}}>
          <Typography variant="h4" sx={{fontFamily: 'Recia'}}>
            Keep your basket within 70 grams of sugar to stay within the daily limit!
          </Typography>

          <Box sx={{mr:100, mb: -15}}>
            <img src="https://sdk.bitmoji.com/render/panel/20053424-150807873_37-s5-v1.png?transparent=1&palette=1&scale=2" alt="my bitmoji" width="200"/>
          </Box>
          <Typography component="ul" sx={{fontSize: '25px', ml: 30, mt: -5, fontFamily: 'General Serif'}}>
            <li >Click a fruit to start earning points</li>
            <li>After you have chosen a fruit, you can increase or decrease the quantity</li>
            <li>Don't forget to hit save then confirm!</li>
          </Typography>
          
          <Button sx={{mt: 3, 
            backgroundColor: '#fa5081',       
            color: 'black',                
            borderColor: 'black',          
            border: '1px solid black',     
            '&:hover': {
              backgroundColor: 'white',
            },}}variant="outlined" onClick={() => setTrigger(true)}>
            Start
          </Button>
        </Box>
      }

      {trigger &&
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ bgcolor: '#fce5dd', width: 'fit-content', borderRadius: 2, px: 4, mx: 'auto', mb: 3, mr: 18}}>     
          <Typography variant="h1" sx={{ textAlign: 'center', mr: 2, fontFamily: 'Gambetta',fontWeight: 'bold' }}>
            Fruit Basket!
          </Typography>
          <img src="https://cdn-icons-png.flaticon.com/512/5601/5601378.png" width="100"></img>
        </Box>
      }
      {trigger &&
          <Box display="flex" bgcolor='#fce5dd' justifyContent="center" alignItems="center" flexDirection="column" marginLeft={40} sx={{ borderRadius: 7, p: 7}}>
            <Box display="flex" flexDirection="row" justifyContent="center" gap={6} marginTop={-5}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <FormControlLabel control={<Checkbox onChange={handleChange(0)}/>}
                  label=
                  {
                    <img src="https://www.iconpacks.net/icons/2/free-apple-icon-3155-thumb.png" alt="apple icon" width="150"/>
                  }
                />
                {!checked[0] &&
                  <ButtonGroup size="small" aria-label="apple quantity">
                    <Button variant="outlined" onClick={handleDecrement(0)}>-</Button>
                    <Button display="true">{quantityCount[0]}</Button>
                    <Button variant="outlined" onClick={handleIncrement(0)} sx={{marginRight:10}}>+</Button>
                  </ButtonGroup>
                } 
              </Box>
                
              <Box display="flex" flexDirection="column" alignItems="center">
                <FormControlLabel control={<Checkbox onChange={handleChange(1)}/>}
                  label=
                  {
                    <img src="https://cdn-icons-png.flaticon.com/512/6482/6482627.png" alt="banana icon"  width="150"/>
                  }
                /> 
                {!checked[1] &&
                  <ButtonGroup size="small" aria-label="banana quantity">
                    <Button variant="outlined" onClick={handleDecrement(1)}>-</Button>
                    <Button display="true">{quantityCount[1]}</Button>
                    <Button variant="outlined" onClick={handleIncrement(1)}sx={{marginRight:10}}>+</Button>
                  </ButtonGroup>
                }
              </Box>

              <Box display="flex" flexDirection="column" alignItems="center">
                <FormControlLabel control={<Checkbox onChange={handleChange(2)}/>}
                  label=
                  {
                    <img src="https://cdn-icons-png.flaticon.com/512/5210/5210447.png" alt="strawberry icon"  width="150"/>
                  }
                />
                {!checked[2] &&
                  <ButtonGroup size="small" aria-label="sb quantity">
                    <Button variant="outlined" onClick={handleDecrement(2)}>-</Button>
                    <Button display="true">{quantityCount[2]}</Button>
                    <Button variant="outlined" onClick={handleIncrement(2)} sx={{marginRight:10}}>+</Button>
                  </ButtonGroup>
                }
              </Box>
            </Box>

            <Box display="flex" flexDirection="row" justifyContent="center" gap={6} marginTop={3}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <FormControlLabel control={<Checkbox onChange={handleChange(3)}/>}
                  label=
                  {
                    <img src="https://cdn-icons-png.flaticon.com/512/5210/5210493.png" alt="blueberry icon"  width="150"/>
                  }
                /> 
                {!checked[3] && 
                  <ButtonGroup size="small" aria-label="bb quantity">
                    <Button variant="outlined" onClick={handleDecrement(3)}>-</Button>
                    <Button display="true">{quantityCount[3]}</Button>
                    <Button variant="outlined" onClick={handleIncrement(3)} sx={{marginRight:10}}>+</Button>
                  </ButtonGroup>
                }
              </Box>
              
              <Box display="flex" flexDirection="column" alignItems="center">
                <FormControlLabel control={<Checkbox onChange={handleChange(4)}/>}
                  label =
                  {
                    <img src="https://png.pngtree.com/png-vector/20220610/ourmid/pngtree-green-grapes-isolated-on-white-background-png-image_4827211.png" alt="green grape icon" width="150"/>
                  }
                />
                {!checked[4] && 
                  <ButtonGroup size="small" aria-label="grape quantity">
                    <Button variant="outlined" onClick={handleDecrement(4)}>-</Button>
                    <Button display="true">{quantityCount[4]}</Button>
                    <Button variant="outlined" onClick={handleIncrement(4)} sx={{marginRight:10}}>+</Button>
                  </ButtonGroup>
                }
              </Box>

              <Box display="flex" flexDirection="column" alignItems="center">
                <FormControlLabel control={<Checkbox onChange={handleChange(5)}/>}
                  label =
                  {
                    <img src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-orange-cartoon-png-image_8081563.png" alt="orange icon" width="150"/>
                  }
                />
                {!checked[5] &&
                  <ButtonGroup size="small" aria-label="orange quantity">
                    <Button variant="outlined" onClick={handleDecrement(5)}>-</Button>
                    <Button display="true">{quantityCount[5]}</Button>
                    <Button variant="outlined" onClick={handleIncrement(5)} sx={{marginRight:10}}>+</Button>
                  </ButtonGroup>
                }
              </Box>
            </Box>

            <Button variant="contained" sx= {{
              mt: 9,
              ml: 1,
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
                fetchFruit();
              }}>
              Confirm
            </Button>
            
            {!trackLimit &&
              <Typography sx={{ mt: 2, color: '#c70039', fontWeight: 'bold' }}>
                ⚠️ WARNING ⚠️ You added {count}g of sugar, pick again to stay within 70g!
              </Typography>
            }

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
      }
    </>
  );
}

export default App