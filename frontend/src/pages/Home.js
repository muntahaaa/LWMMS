import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div>
      {/*** Category Listing ***/}
      <CategoryList />
      
      {/*** Banner Section ***/}
      <BannerProduct />

      {/*** Featured & Important Artifacts ***/}
      <HorizontalCardProduct category={"newspaper-clippings"} heading={"Newspaper Clippings"} />
      <HorizontalCardProduct category={"documents"} heading={"Rare Historical Documents"} />

      {/*** Display of Various Artifact Categories ***/}
      <VerticalCardProduct category={"photographs"} heading={"Photographs from the Liberation War"} />
      <VerticalCardProduct category={"weapons"} heading={"Weapons & Ammunition"} />
      <VerticalCardProduct category={"medals-awards"} heading={"Medals & Honors"} />
      <VerticalCardProduct category={"letters-diaries"} heading={"Letters from the Battlefield"} />
      <VerticalCardProduct category={"personal-belongings"} heading={"Freedom Fighter Uniforms"} />
      <VerticalCardProduct category={"audio-visual-records"} heading={"Audio & Radio Broadcasts"} />
      <VerticalCardProduct category={"artworks-paintings"} heading={"Miscellaneous War Artifacts"} />
      <VerticalCardProduct category={"posters-pamphlets"} heading={"Posters & Pamphlets"} />
    </div>
  );
};

export default Home;
