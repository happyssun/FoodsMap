import React, {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import CustomButton from '../../components/CustomButton';
import {validateSignup} from '../../utils';
import useAuth from '../../hooks/queries/useAuth';

export default function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const {signupMutation, loginMutation} = useAuth();
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const {email, password} = signup.values;

    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => loginMutation.mutate({email, password}),
      },
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email} // 터치된 상태를 넣어줌
          inputMode="email"
          returnKeyType="next" // 리턴키를 next키로
          blurOnSubmit={false} // next키를 눌러도 키보드가 닫히지 않음
          onSubmitEditing={() => passwordRef.current?.focus()}
          /* value={values.email}
            onChangeText={text => handleChangeText('email', text)}
            onBlur={() => handleBlur('email')} */
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={signup.errors.password}
          touched={signup.touched.password}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
          secureTextEntry // 비밀번호 마스킹
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 체크"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
          secureTextEntry // 비밀번호 마스킹
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});
