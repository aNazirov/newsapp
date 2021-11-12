import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Control, useController } from 'react-hook-form';
import { AppText } from '../appText';
import { red } from '../../../styles/layout.styles';

interface IError {
  message: string;
}

interface Props extends TextInputProps{
  name: string;
  style: any;
  error: IError;
  control: Control;
  defaultValue?: any;
  autoCapitalize?: 'none' | 'characters' | 'words' | 'sentences';
}

export const AppInput: React.FC<Props> = ({ control, name, defaultValue = '', style, error, autoCapitalize = 'none', children, ...props }) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });
  return (
    <>
      <TextInput
        style={style}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        autoCapitalize={autoCapitalize}
        {...props}
      />
      {
        error?.message &&
        <AppText style={styles.error}>{error.message}</AppText>
      }
    </>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-regular',
  },
  error: {
    marginBottom: 15,
    fontSize: 12,
    color: red
  }
});