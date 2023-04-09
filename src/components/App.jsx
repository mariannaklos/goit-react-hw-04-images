import { useState, useEffect } from 'react';
import React from 'react';
import { Serchbar } from './Searchbar/Searchbar';
import { fetchData } from 'service/api';
import { GaleryImg } from './ImageGallery/ImageGallery';
import { Btn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { BasaStyled } from './add.styled';

export const App = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState(null);
  const [isLoad, setLoad] = useState(false);
  const [onShow, setShow] = useState(false);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    setLoad(true);

    fetchData(inputValue, page)
    .then(({ hits, totalHits }) => {
     setCard(prevState => [...prevState, ...hits]);
          setLoad(false);
          setShow(page < Math.ceil(totalHits / 12));
  
      })
      .catch(error => console.log(error));
      
  }, [page, inputValue]);

  const FindPicteru = e => {
    if (e.serch === '') {
      alert('Enter a search name');
    } else {
      setPage(1);
      setLoad(true);
      setCard([]);
      setInputValue(e.serch);
    }
  };

  const addPages = () => {
    setPage(page + 1);
  };

  return (
    <BasaStyled>
      <Serchbar onSubmit={FindPicteru} />
      <GaleryImg img={card} />
      {isLoad !== false && <Loader />}
      {onShow === true && isLoad === false && <Btn addPages={addPages} />}
    </BasaStyled>
  );
};