import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Control, useController } from 'react-hook-form';
import { AppText } from '../appText';
import { blue, red } from '../../../styles/layout.styles';
import { Ionicons } from '@expo/vector-icons';

interface IError {
  message: string;
}

interface Props {
  name: string;
  style: any;
  error: IError;
  control: Control;
  defaultValue?: any;
}

export const AppCheckbox: React.FC<Props> = ({ control, name, defaultValue = false, error }) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });
  return (
    <>
      <Pressable
        style={[styles.checkboxBase, field.value && styles.checkboxChecked]}
        onPress={() => field.onChange(!field.value)}>
        {field.value && <Ionicons name="checkmark" size={12} color="white" />}
      </Pressable>
      {
        error?.message &&
        <AppText style={styles.error}>{error.message}</AppText>
      }
    </>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, .1)',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    borderColor: blue,
    backgroundColor: blue,
  },
  error: {
    marginBottom: 15,
    fontSize: 12,
    color: red,
  },
});