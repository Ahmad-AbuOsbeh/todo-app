import { useState, useEffect, useContext, useCallback } from 'react';
import { SettingsContext } from '../../context/settings';
import List from '../list/list';
import { Button } from '@blueprintjs/core';

export default function Pagination(props) {
  let btnArr = [];
  const settings = useContext(SettingsContext);
  const [choosenList, setChoosenList] = useState(settings.showCompleted == 'true' ? props.list : props.incomplete);
  const [activeList, setActiveList] = useState(choosenList.slice(0, settings.itemsPerPage));
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(choosenList.length / settings.itemsPerPage));
  const [activePage, setActivePage] = useState(1);
  const [buttonsArray, setButtonsArray] = useState(btnArr);

  useEffect(() => {
    setChoosenList(settings.showCompleted == 'true' ? props.list : props.incomplete);
  }, [props.list, props.incomplete, settings.showCompleted]);
  useEffect(() => {
    setActiveList(choosenList);
    setNumberOfPages(Math.ceil(choosenList.length / settings.itemsPerPage));
  }, [choosenList, settings.itemsPerPage]);

  useEffect(() => {
    if (numberOfPages) {
      console.log('hello from if', numberOfPages);

      btnArr.push('Prev');

      for (let i = 1; i <= numberOfPages; i++) {
        btnArr.push(i);
      }

      btnArr.push('Next');

      setButtonsArray(btnArr);
    }
  }, [numberOfPages]);

  useEffect(() => {
    let start = (activePage - 1) * settings.itemsPerPage;
    let end = start + Number(settings.itemsPerPage);
    console.log('start, end', start, end);
    setActiveList(choosenList.slice(start, end));
  }, [activePage, settings.itemsPerPage, choosenList]);

  useEffect(() => {
    if (activeList.length == 0 && choosenList.length != 0) {
      setActivePage(activePage - 1);
    }
  }, [activeList]);

  function handlePages(pageNumber) {
    console.log(typeof pageNumber);
    if (pageNumber == 'Prev' && buttonsArray.includes(activePage - 1)) {
      setActivePage(activePage - 1);
    } else if (pageNumber == 'Next' && buttonsArray.includes(activePage + 1)) {
      setActivePage(activePage + 1);
    } else if (typeof pageNumber == 'number') {
      setActivePage(pageNumber);
    }
  }

  return (
    <>
      <br />
      <List activeList={activeList} toggleComplete={props.toggleComplete} />
      {console.log('buttonsArray', buttonsArray)}
      <br />

      {buttonsArray &&
        buttonsArray.map((item) => (
          <>
            {console.log('item', item)}
            <Button onClick={() => handlePages(item)} className='pagination-buttons'>
              {item}
            </Button>
          </>
        ))}
    </>
  );
}
