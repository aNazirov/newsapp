import React, { useEffect, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { headerStyles } from '../../styles/header.styles';
import { Weather, Currency, Profile, Sign } from '../shared';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getNotificationsCount } from '../../store/notifications/notifications.thunks';
import { getActiveRouteState } from '../../_data/helpers';
import { useTranslation } from 'react-i18next';
import { AppSelect } from '../shared/appSelect';
import { getSearchPostsService } from '../../services/posts.service';
import { FormatOptionName } from '../../interfaces';
import { DrawerHeaderProps } from '@react-navigation/drawer';

interface Props extends DrawerHeaderProps {
  style: any;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export const Header: React.FC<Props> = ({ style, navigation }) => {
  const { t } = useTranslation();
  const activeRoute = getActiveRouteState(navigation.getState());
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { token, lang } = useAppSelector(state => state.global);
  useEffect(() => {
    if (token) dispatch(getNotificationsCount(token));
  }, []);
  const onSelect = (item: FormatOptionName) => {
    navigation.navigate(item.type, { slug: item.value });
  };
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View onTouchStart={e => {
        e.stopPropagation();
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
              // <View onTouchStart={e => e.stopPropagation()}>
              //   <Image source={require('../../../assets/images/icons/searchL.png')} style={headerStyles.inputIcon} />
              //   <TextInput
              //     style={{ ...headerStyles.input, marginRight: token ? 22 : 0 }}
              //     onChangeText={val => setText(val)}
              //     onSubmitEditing={() => navigation.navigate('Search', { text })}
              //     value={text}
              //     placeholder={t('Поиск по новостям и авторам')}
              //   />
              // </View>
              <View onTouchStart={e => e.stopPropagation()}>
                <AppSelect
                  onSelect={onSelect}
                  placeholder={t('Поиск')}
                  getItems={(text: string) => {
                    return getSearchPostsService({ text }, lang)
                      .then(res => {
                        return res.posts.reduce((total: any, item: any) => {
                          return [...total, ...item.data];
                        }, []);
                      });
                  }
                  }
                />
              </View>
            }
            {
              !show && activeRoute.name !== 'Search' &&
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                  setShow(!show);
                }}
                style={{ marginLeft: 'auto', marginRight: 15 }}
              >
                <Image
                  style={{ ...headerStyles.icons }}
                  source={require('../../../assets/images/icons/search.png')}
                />
              </TouchableOpacity>
            }
          </View>
          <View>
            {
              !!token
                ? <Profile />
                : <Sign />
            }
          </View>
        </View>
        <View style={{ ...headerStyles.infoContainer, ...style, zIndex: -1 }}>
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
