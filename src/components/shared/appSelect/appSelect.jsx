import React, { useState } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';

export const AppSelect = ({ placeholder, getItems, onSelect }) => {
  const [items, setItems] = useState([]);
  console.log(items)
  return (
    <>
      <SearchableDropdown
        onTextChange={text => {
          return getItems(text)
            .then(options => {
              setItems(options?.map((item) => {
                return {
                  type: item.id ? 'Posts' : 'Categories',
                  value: item.slug || item.id,
                  name: item.name || item.title,
                  image: item.image || item.avatar,
                };
              }));
            });
        }}
        //On text change listner on the searchable input
        onItemSelect={onSelect}
        //onItemSelect called after the selection from the dropdown
        containerStyle={{}}
        //suggestion container style
        textInputStyle={{
          //inserted text style
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: 'transparent',
          backgroundColor: '#E5E5E5',
          borderRadius: 4,
        }}
        itemStyle={{
          //single dropdown item style
          padding: 10,
          marginTop: 2,
        }}
        itemTextStyle={{
          //text style of a single dropdown item
          color: '#222',
        }}
        itemsContainerStyle={{
          //items container style you can pass maxHeight
          //to restrict the items dropdown hieght
          top: 50,
          maxHeight: 200,
          width: '100%',
          position: 'absolute',
          backgroundColor: '#fff',
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#e5e5e5',
        }}
        items={items}
        //mapping of item array
        defaultIndex={2}
        //default selected item index
        placeholder={placeholder}
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid='transparent'
        //To remove the underline from the android input
        setSort={(item)=> item?.name}
      />
    </>
  );
};

