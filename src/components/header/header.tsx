import React, { useEffect, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { headerStyles } from '../../styles/header.styles';
import { Weather, Currency } from '../shared';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getGlobalData, langSet } from '../../store/global/global.thunks';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  style: any;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export const Header: React.FC<Props> = ({ style }) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const { lang } = useAppSelector(state => state.global);
  useEffect(() => {
    AsyncStorage.getItem('lang')
      .then((result: any) => dispatch(langSet(result || 'ru')));
  }, []);
  useEffect(() => {
    dispatch(getGlobalData(lang));
  }, [lang]);

  return (
    <SafeAreaView>
      <View onTouchStart={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setShow(false);
      }}>
        <View style={{ ...headerStyles.layoutContainer, ...style }}>
          <View style={headerStyles.imagesContainer}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
            >
              <Image
                style={{ ...headerStyles.icons, marginRight: 22 }}
                source={require('../../../assets/images/icons/burger.png')}
              />
            </TouchableOpacity>
            {
              !show &&
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
              >
                <Image style={headerStyles.logo} source={require('../../../assets/images/logo.png')} />
              </TouchableOpacity>
            }
          </View>
          <View style={headerStyles.inputContainer}>
            {
              show &&
              <View onTouchStart={e => e.stopPropagation()}>
                <Image source={require('../../../assets/images/icons/searchL.png')} style={headerStyles.inputIcon} />
                <TextInput
                  style={headerStyles.input}
                  onChangeText={val => setText(val)}
                  onSubmitEditing={() => navigation.navigate('Search', { text })}
                  value={text}
                />
              </View>
            }
            {
              !show &&
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                  setShow(!show);
                }}
                style={{ marginLeft: 'auto' }}
              >
                <Image
                  style={{ ...headerStyles.icons }}
                  source={require('../../../assets/images/icons/search.png')}
                />
              </TouchableOpacity>
            }
          </View>
          <Image style={{ ...headerStyles.icons, marginLeft: 22 }}
                 source={require('../../../assets/images/icons/Vector.png')} />
        </View>
        <View style={{ ...headerStyles.infoContainer, ...style }}>
          <View style={{ height: 20, flex: 1.5 }}>
            <Currency />
          </View>
          <View style={{ height: 20, flex: 1 }}>
            <Weather />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
