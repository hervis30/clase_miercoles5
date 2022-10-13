import { StyleSheet, Text, View, TextInput, Switch, Picker, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

export default function App() {
  const [rol, setRol] = useState('adm');
  const [isActive, setIsActive] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      dofb: '',
      password: '',
      salary: '',
      age: '',
    }
  });
  const onSubmit = data => {
    console.log(data);
    console.log(rol);
    console.log(isActive)
  }
  const toggleSwitch = () => setIsActive(previousState => !previousState);
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 30,
          minLength: 3,
          pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.inputs, {
            borderColor: errors.fullName?.type == 'required' || errors.fullName?.type == 'pattern' || errors.fullName?.
              type == 'maxLength' || errors.fullName?.type == 'minLength' ? 'red' : 'green'
          }]}
            placeholder="Nombre completo"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='fullName'
      />
      {errors.fullName?.type == "required" && <Text style={{ color: 'red', fontSize: 15 }}>El nombre es obligatorio</Text>}
      {errors.fullName?.type == "minLength" && <Text style={{ color: 'red', fontSize: 15 }}>El nombre debe tener minimo 3 caracteres</Text>}
      {errors.fullName?.type == "maxLength" && <Text style={{ color: 'red', fontSize: 15 }}>El nombre debe tener maximo 30 caracteres</Text>}
      {errors.fullName?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>El nombre debe tener letras y/o espacios</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.inputs}
            placeholder="Correo electronico"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='email'
      />
      {errors.email?.type == "required" && <Text style={{ color: 'red', fontSize: 15 }}>El correo es obligatorio</Text>}
      {errors.email?.type == "minLength" && <Text style={{ color: 'red', fontSize: 15 }}>El nombre debe tener minimo 6 caracteres</Text>}
      {errors.email?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>El correo no es valido</Text>}

      <Controller
        control={control}
        rules={{
          pattern: /^([012][1-9]|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.inputs}
            placeholder="Fecha de nacimiento: dd/mm/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='dofb'
      />

      {errors.dofb?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>La fecha debe terner formato</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){5,15}$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.inputs}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='password'
      />
      {errors.password?.type == "required" && <Text style={{ color: 'red', fontSize: 15 }}>La contraseña es obligatoria</Text>}
      {errors.password?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>Debe tener numeros,letra minuscula y mayuscula,punto y caracter especial, sin espacios, maximo 15 caracteres</Text>}

      <Controller
        control={control}
        rules={{
          pattern: /^[0-9,$]*$/

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.inputs}
            placeholder="Salario"
            // secureTextEntry={true}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='salary'
      />
      {errors.salary?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>El salario debe ser solo numeros</Text>}

      <Picker
        selectedValue={rol}
        style={{ height: 30, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setRol(itemValue)}
      >

        <Picker.Item label="Administrador" value="adm" />
        <Picker.Item label="Usuario  Final" value="user" />

      </Picker>
      <View style={{ flexDirection: 'row', true: 'gray' }}>
        <Text>Esta activo?</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isActive ? "pink" : "red"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isActive}
        />
      </View>
      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, marginTop: 10, width: 100 }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5
  }
});
