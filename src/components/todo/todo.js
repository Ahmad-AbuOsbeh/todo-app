import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import Pagination from '../pagination/pagination';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { SettingsContext } from '../../context/settings';
import { LoginContext } from '../../context/Login-context';
import superagent from 'superagent';

// import { v4 as uuid } from 'uuid';

const ToDo = () => {
  const API = 'https://api-js401.herokuapp.com';

  const settings = useContext(SettingsContext);
  const logincontext = useContext(LoginContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  //Did Mount
  useEffect(async () => {
    const response = await superagent.get(`${API}/api/v1/todo`);

    setList(response.body.results);
  }, []);

  useEffect(async () => {
    const response = await superagent.get(`${API}/api/v1/todo`);

    setList(response.body.results);
  }, [logincontext.isUpdated, settings.showCompleted, settings.itemsPerPage]);

  async function addItem(item) {
    try {
      // item.id = uuid();
      item.complete = false;
      const response = await superagent.post(`${API}/api/v1/todo`, item);
      setList([...list, response.body]);
    } catch (e) {
      console.error('Add Item Error', e.message);
    }
  }

  async function deleteItem(id) {
    try {
      await superagent.delete(`${API}/api/v1/todo/${id}`);
      const items = list.filter((item) => item._id !== id);

      setList(items);
    } catch (e) {
      console.error('delete Item Error', e.message);
    }
  }

  async function toggleComplete(id) {
    try {
      let updatedItem;
      const items = list.map((item) => {
        if (item._id == id) {
          item.complete = !item.complete;
          updatedItem = item;
        }
        return item;
      });
      await superagent.put(`${API}/api/v1/todo/${id}`, updatedItem);
      logincontext.setIsUpdated(!logincontext.isUpdated);
      setList(items);
    } catch (e) {
      console.error('update Item Error', e.message);
    }
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete);
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete.length}`;
  }, [list, settings.showCompleted]);

  return (
    <>
      <div className='form-container'>
        <header>
          <h1>
            To Do List: {incomplete.length} items pending, and {list.length - incomplete.length} completed
          </h1>
        </header>

        {logincontext.userCapability.length > 1 && (
          <>
            <h2>Add To Do Item</h2>
            <form onSubmit={handleSubmit}>
              <FormGroup helperText='' label='To Do Item' labelFor='text-input' labelInfo=''>
                <InputGroup id='text-input' placeholder='Item Details' onChange={handleChange} name='text' />
              </FormGroup>
              <FormGroup helperText='' label='Assigned To' labelFor='text-input' labelInfo=''>
                <InputGroup id='text-input' placeholder='Assignee Name' onChange={handleChange} name='assignee' />
              </FormGroup>
              <FormGroup helperText='' label='Difficulty' labelFor='text-input' labelInfo=''>
                <input onChange={handleChange} defaultValue={3} type='range' min={1} max={5} name='difficulty' />
              </FormGroup>
              <label>
                <Button type='submit'>Add Item</Button>
              </label>
            </form>{' '}
          </>
        )}
      </div>

      <Pagination className='pagList-container' list={list} incomplete={incomplete} toggleComplete={toggleComplete} deleteItem={deleteItem}></Pagination>
    </>
  );
};

export default ToDo;
