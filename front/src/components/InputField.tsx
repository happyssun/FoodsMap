import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  TextInput,
  Pressable,
} from 'react-native';

import {colors} from '../constants';
import {mergeRefs} from '../utils';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}
const deviceHeight = Dimensions.get('screen').height;

// ref를 다른곳에서도 사용을 하기 때문에 이것을 forwardRef로
const InputField = forwardRef(
  (
    {disabled = false, error, touched, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    // view 전체 어디를 눌러도 인풋포커스가 되게
    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <TextInput
            // ref={innerRef} ref를 두개 사용하기때문에 여기를 합친 함수로 대신 사용
            ref={ref ? mergeRefs(innerRef, ref) : innerRef}
            editable={!disabled}
            placeholderTextColor={colors.GRAY_500}
            style={styles.input}
            autoCapitalize="none" // 핸드폰에서 자동 대문자기능 방지
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
          {/* 처음 화면을 갔을때는 에러메세지가 없는데 커서를 옮겨놓고 빈칸으로 두고 다음으로 넘어가면 그때 에러가 발생
              에러메세지는 에러일때만 나와야하니까 앞에 boolean을 넣어준것 : 따라서 현재는 인풋창을 터치하고도 빈칸으로 두고 다른데로 가거나 에러일때 에러메세지가 나옴 */}
        </View>
      </Pressable>
    );
  },
);
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

/**
 * 현재 보면 박스는 view이고 그안에 input이 들어가 있는거라 view 부분을 클릭하게 되면 포커스가 안된다 그래서 박스 어디를 눌러도 적용되게 하려고
  const innerRef = useRef<TextInput | null>(null);
  return (
    <Pressable onPress={() => innerRef.current?.focus()}>
  이렇게  useRef를 사용하고 버튼눌렀을때를 pressable로 해줌
 */

// 넘겨준 ref와 내부에서 사용하는 ref를 둘다 사용하기 위해서 mergeRef라는 함수를 만들어서 사용 : 리액트 라이브러리에서 mergeRef를 가져와서 사용해도 됨
