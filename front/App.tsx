import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function App() {
  const [name, setName] = useState('');

  const handlChangeInput = (text: string) => {
    // setName(e.target.value);  리액트에서는 이벤트를 넣어 이런식으로 했지만 네이티브에선 이벤트자리에 바로 text넣어 가능
    setName(text);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handlChangeInput}
        />
        <Text>Text</Text>
      </View>

      <Button title="버튼이름" onPress={() => console.log('클릭됨')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    height: 100,
    width: 100,
  },
  inputContainer: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
