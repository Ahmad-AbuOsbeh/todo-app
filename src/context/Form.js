import React, { useContext, useState, useEffect } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { SettingsContext } from './settings';

export default function Form() {
  const settings = useContext(SettingsContext);

  function handleChange(e) {
    if (e.target.name == 'items') {
      settings.setItemsPerPage(e.target.value);
      localStorage.setItem('items', JSON.stringify(e.target.value));
    }
    if (e.target.name == 'completed') {
      settings.setShowCompleted(e.target.value);
      localStorage.setItem('completed', JSON.stringify(e.target.value));
    }
  }
  useEffect(() => {
    const items = localStorage.getItem('items');
    if (items) {
      settings.setItemsPerPage(JSON.parse(items));
    }
    const completed = localStorage.getItem('completed');
    if (completed) {
      settings.setShowCompleted(JSON.parse(completed));
    }
  }, []);
  return (
    <>
      <div>
        <h2>TO DO Settings : </h2>
        <form>
          <FormGroup label='Items Per Page (1 - 10) :' labelFor='text-input'>
            <InputGroup id='text-input' placeholder='# of items/page' type='Number' onChange={handleChange} name='items' value={settings.itemsPerPage} min='1' max='10' />
          </FormGroup>
          <FormGroup helperText='' label='Show Completed :' labelFor='text-input' labelInfo=''>
            <div className='bp3-html-select .modifier'>
              <select name='completed' value={settings.showCompleted} onChange={handleChange}>
                <option value='true'>True</option>
                <option value='false'>False</option>
              </select>
              <span className='bp3-icon bp3-icon-double-caret-vertical'></span>
            </div>
          </FormGroup>
        </form>
      </div>
    </>
  );
}
