import React, { JSXElementConstructor } from 'react';
import { Platform } from 'react-native';

interface Props {
  Ios: any,
  Android: any,
}

export const CrossPlatform: React.FC<Props> = ({Ios, Android, children}) => {
  const platform = Platform.OS
  return (
    <>
      {
        platform === 'ios'
          ? (
            <Ios>
              {children}
            </Ios>
          )
          : (
            <Android>
              {children}
            </Android>
          )
      }
    </>
  )
}