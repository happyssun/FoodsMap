import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  /* 기존방식
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeEmail = (text: string) => {
    setEmail(text);
  };
  const handleChangePassword = (text: string) => {
    setPassword(text);
  };
  */
  /* input 마다 핸들링을 하지 않고 하나로
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChangeText = (name: string, text: string) => {
    setValues({...values, [name]: text});
  };

  // 블러이벤트 추가
  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };
  */

  // 위의 것을 hooks로 만들어서 관리
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  console.log(login.getTextInputProps('email'));

  const handleSubmit = () => {
    console.log('values', login.values);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="E-MAIL"
          error={login.errors.email}
          touched={login.touched.email} // 터치된 상태를 넣어줌
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="PASSWORD"
          error={login.errors.password}
          touched={login.touched.password}
          returnKeyType="join"
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
          secureTextEntry // 비밀번호 마스킹
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
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

export default LoginScreen;

// inputmode를 설정하면 키보드의 형태를 변경할수있다 inputMode="number" 이런식으로
