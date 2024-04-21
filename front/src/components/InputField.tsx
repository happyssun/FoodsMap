import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  TextInput,
} from 'react-native';

import {colors} from '../constants';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
}
const deviceHeight = Dimensions.get('screen').height;

function InputField({disabled = false, error, ...props}: InputFieldProps) {
  return (
    <View
      style={[
        styles.container,
        disabled && styles.disabled,
        Boolean(error) && styles.inputError,
      ]}>
      <TextInput
        editable={!disabled}
        placeholderTextColor={colors.GRAY_500}
        style={styles.input}
        autoCapitalize="none" // 핸드폰에서 자동 대문자기능 방지
        spellCheck={false}
        autoCorrect={false}
        {...props}
      />
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
      {/* 에러메세지는 에러일때만 나와야하니까 앞에 boolean */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
