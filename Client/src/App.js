import React, { useState,useRef } from 'react';
import { BrowserRouter as Router,Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';

import AlertCreate from './Components/AlertCreate';
import Alert from './Components/Alert';

import axios from './axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
`;

const Bar = styled.div`
  flex: 1;
  background-color: #61dafb;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 40px;
  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }
  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
`;

const App = (props) => {

  const emailEditorRef = useRef(null);

  const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const [openCreate, setOpenCreate] = useState(false);

    const handleClickOpenCreate = () => {
      setOpenCreate(true);
    };

    const handleCloseCreate = () => {
      setOpenCreate(false);
    };

  const saveDesign = async(type) => {
    emailEditorRef.current.editor.saveDesign(async(design) => {
      console.log('saveDesign', design);
      const response=await axios.post('/design',design);
      if(type=='save'){
        alert('Design saved.');
        window.location.replace(`/${response.data._id}`)
      }
      else
        window.location.replace('/');
    });
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
      alert('Output HTML has been logged in your developer console.');
    });
  };

  return (

    <Router>
    
      <Container>
        <Bar>
          <h1>React Email Editor (Demo)</h1>
          <AlertCreate
            open={openCreate}
            handleClose= {handleCloseCreate}
            description={`Do You want to save this design?`}
            action= {
              {
                agree : async()=>{
                  await saveDesign('create');
                  handleCloseCreate();
                },
                disagree: ()=>{
                  handleCloseCreate();
                  window.location.replace('/');
              }
            }
          }
          />
          <button onClick={handleClickOpenCreate}>Create New Design</button>
          <button onClick={async()=>await saveDesign('save')}>Save Design</button>
          <button onClick={handleClickOpen}>Open Designs</button>

          <Alert
            open={open}
            handleClose= {handleClose}
          />

        </Bar>

        <React.StrictMode>
          <Switch>
                <Route path="/"  exact>
                  <Home emailEditorRef={emailEditorRef} />
                </Route>
                <Route path="/:id"  exact>
                  <Home emailEditorRef={emailEditorRef}/>
                </Route>
          </Switch>
        </React.StrictMode>
      </Container>
    </Router>
  );
};

export default App;