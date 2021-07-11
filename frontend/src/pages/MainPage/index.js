import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import ContainerList from './components/ContainerList';
import PequodAppBar from './components/PequodAppBar';
import styled from 'styled-components';

const fetchContainerData = async () => {
  const containerData = await axios.get('http://localhost:5000/containers');
  return containerData.data;
};

const PageBackground = styled.div`
  background-color: #87ceeb;
  height: 100%;
  width: 100%;
  position: fixed;
`

const MainPage = () => {
  const [containers, setContainers] = useState([]);

  const populateContainers = async () => {
    const containersData = await fetchContainerData();
    setContainers(containersData);
  };

  useEffect(() => populateContainers(), []);

  return (
    <PageBackground>
      <PequodAppBar />
      <ContainerList containers={containers} />
    </PageBackground>
  );
};

export default MainPage;
