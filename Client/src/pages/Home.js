import React, {useState, useEffect} from 'react';

import EmailEditor from 'react-email-editor';
import sample from '../sample.json';

import {useParams} from 'react-router-dom';
import axios from '../axios';

const Home = (props) => {

    const params= useParams();

    console.log(params);

    const [data,setData]= useState(null);

    useEffect(async()=>{
        if(params.id){
            const response= await axios.get(`/design/${params.id}`);
            console.log(response.data);
            setData(response.data);
        }
        else
            setData(sample);
    },[data]);

    console.log(data);

    const onDesignLoad = (data) => {
        console.log('onDesignLoad', data);
    };

    const onLoad = (dataProps) => {
        props.emailEditorRef.current.editor.addEventListener(
            'onDesignLoad',
            onDesignLoad
        )
        props.emailEditorRef.current.editor.loadDesign(dataProps);
    };

    if(!data)
        return <>Loading...</>

    return (
            <EmailEditor ref={props.emailEditorRef} onLoad={()=>onLoad(data)} />
    );
};

export default Home;