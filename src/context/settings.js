import React, { useState } from 'react';
export const SettingsContext = React.createContext();

export default function Settings(props) {
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [sortCat, setSortCat] = useState('hardest');
  const [showCompleted, setShowCompleted] = useState(false);
  return <SettingsContext.Provider value={{ itemsPerPage, showCompleted, setItemsPerPage, setShowCompleted }}>{props.children}</SettingsContext.Provider>;
}
