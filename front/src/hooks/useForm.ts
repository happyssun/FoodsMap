import {useEffect, useState} from 'react';

// 제네릭타입으로 정의 통상적으로 <T>를 사용
// any와 같이 다양한 타입에 작용하나 중요한 다른점은 해당타입에 대한 정보를 잃지 않는다는것
interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({initialValue, validate}: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({}); // value값은 string이 키고 boolean이 값인 객체
  const [errors, setErrors] = useState<Record<string, string>>({});

  // initialValue가 email:'' 이런식으로 객체로 들어옴으로 그래서 string 대신 객체의 키라고 타입을 해야함
  const handleChangeText = (name: keyof T, text: keyof T) => {
    setValues({...values, [name]: text});
  };

  // 블러이벤트 추가
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (text: string) => handleChangeText(name, text);
    const onBlur = () => handleBlur(name);

    return {value, onChangeText, onBlur};
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return {values, touched, errors, getTextInputProps};
}
export default useForm;
