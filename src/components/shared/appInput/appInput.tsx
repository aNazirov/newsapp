import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Control, useController } from 'react-hook-form';
import { AppText } from '../appText';
import { red } from '../../../styles/layout.styles';

interface IError {
  message: string;
}

interface Props {
  name: string;
  style: any;
  error: IError;
  control: Control;
  placeholder?: string;
  defaultValue?: string;
  autoCapitalize?: 'none' | 'characters' | 'words' | 'sentences';
}

export const AppInput: React.FC<Props> = ({ control, name, defaultValue = '', style, error, placeholder = '', autoCapitalize = 'none' }) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });
  return (
    <>
      <TextInput
        style={style}
        placeholder={placeholder}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        autoCapitalize={autoCapitalize}
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