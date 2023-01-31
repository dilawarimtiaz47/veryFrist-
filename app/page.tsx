"use client";
import * as React from 'react'
import { Flex , Heading, Input, Button, Checkbox, Stack, Spacer, useToast, useColorMode, useColorModeValue} from '@chakra-ui/react'
import{DeleteIcon, MoonIcon, SunIcon} from "@chakra-ui/icons"
import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import {  List, ListItem,ListIcon,OrderedList, UnorderedList,
} from '@chakra-ui/react'

//import { useState } from "react";
export default function Home() {
    let {toggleColorMode} = useColorMode()
    let changecolorfamily = useColorModeValue('gray.100', 'gray.700')
    let [addtodo, setaddTo] = useState(" ");
    const toast = useToast()

    let [todos,setTodos] = useState([
      {Activity :"Wake up early",State :false},
      {Activity :"office",State :false},
      {Activity :"Academy",State :false},
      {Activity :"go out with friends ",State :false},
      {Activity :"Sleep",State :false},

    ]);


    function clickHandler(props:any){
      let newVal = todos.map((todo) =>{
        if(todo.Activity == props.Activity){
          todo.State = !todo.State;
        }
        return todo;
      });
      setTodos(newVal);
    }


    function addHandler (){
      if (addtodo == "" || addtodo == " "){
        toast({
          title:'Please Enter Task',
          status : 'error',
          duration : 9000,
          isClosable:true,
        })
      }
      else {
        let obj = {Activity : addtodo,State : false };
        todos = [...todos, obj];
        setTodos(todos);
        addtodo = "";
        setaddTo(addtodo);
      }


    }

    function deleteHandler (props:any){
      let newTodo =todos.filter((todo)=>{
        if(todo.Activity==props.Activity) return false;
        return true;
      });
      setTodos(newTodo);
    }



  return ( 
    
    <>
    <ChakraProvider>
    <Button width = "fit-content"  onClick={toggleColorMode}>{changecolorfamily== "gray.100"? <SunIcon/> :<MoonIcon/>}</Button>  
    <Heading mb= {5}> My To-Do List</Heading> 
   <Stack direction = "row" mb = {4} >
      <input  type="text" 
       placeholder="Type here"
       //focusBorderColor='teal.400'
       value={addtodo}
       onChange={(e) => {
        setaddTo(e.target.value);
       }} />
       <Button onClick={addHandler} p={5}  colorScheme='teal' size="md">Add New Activity</Button>
    </Stack>

{todos.map((todo) => {
  return (
    <>
    <Stack direction="row" mb ={3}>
      <Checkbox defaultChecked={todo.State}
      colorScheme='teal'
      key = {todo.Activity}
      onChange = {() => clickHandler (todo)}>
        {todo.Activity}
      </Checkbox>
      <Spacer/>
      <Button size = "sm" onClick={() => deleteHandler(todo)}><DeleteIcon color="red.500" boxSize={4}/></Button>
    </Stack>
    </>
  );

  

    })}
 
 </ChakraProvider>
    </>
   
   
   );
}
