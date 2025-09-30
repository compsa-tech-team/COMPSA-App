import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateAccountPage() {

  const router = useRouter()
  type accountErrors = {
    email?: string;
    password?: string;
    passCheck?: string;
  }

    const [createForm, setCreateForm] = useState({
        'email' : '',
        'password': '',
        'passCheck': ''
    })
    const [errors, setErrors] = useState<accountErrors>({})

    

    const handleCreateAccount = () => {
      const newErrors: accountErrors = {}
      if (!createForm.email.trim()) {
        newErrors.email = "Email is required"
      }
      else if (!createForm.email.endsWith("@queensu.ca") && !createForm.email.endsWith("@compsa.queensu.ca")) {
        newErrors.email = "Email must end with @queensu.ca or @compsa.queensu.ca"
      }
      
      if (!createForm.password.trim()) {
        newErrors.password = "Password is required"
      }

      if (createForm.password !== createForm.passCheck) {
        newErrors.passCheck = "Passwords do not match"
      }

      setErrors(newErrors)
    }

    return (
        <LinearGradient style={styles.container}
          colors={['#1f1f1f', '#1f1f1f', '#381c64']}
          locations={[0, 0.3, 1]}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Please create an account</Text>
                <View style={styles.inputDiv}>
                  <TextInput
                      style={styles.input}
                      placeholder="Enter Queen's Email"
                      value={createForm.email}
                      onChangeText={(email) => setCreateForm((prevForm) => ({...prevForm, 'email': email}))}
                  ></TextInput>
                  {errors.email && <Text style={styles.error}>*{errors.email}</Text>}
                </View>
                <View style={styles.inputDiv}>
                  <TextInput
                      style={styles.input}
                      placeholder="Enter Password"
                      value={createForm.password}
                      secureTextEntry={true}
                      onChangeText={(password) => setCreateForm((prevForm) => ({...prevForm, 'password': password}))}
                  ></TextInput>
                  {errors.password && <Text style={styles.error}>*{errors.password}</Text>}
                </View>
                <View style={styles.inputDiv}>
                  <TextInput
                      style={styles.input}
                      placeholder="Re-Enter Password"
                      value={createForm.passCheck}
                      secureTextEntry={true}
                      onChangeText={(passCheck) => setCreateForm((prevForm) => ({...prevForm, 'passCheck': passCheck}))}
                  ></TextInput>
                  {errors.passCheck && <Text style={styles.error}>*{errors.passCheck}</Text>}
                </View>
               <TouchableOpacity onPress={() => handleCreateAccount()} style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
               </TouchableOpacity>
               <Text style={styles.subtitle}>Already have an account? 
                <Pressable onPress={() => router.push('/login')}>
                  <Text style={styles.linkText}>
                    Log In
                  </Text>
                </Pressable>
               </Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '__gotham_146128',
    textAlign: 'left'
  },
  card: {
    backgroundColor: '#262626',
    padding: 30,
    textAlign: 'left',
    gap: 15,
    width: '85%'
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: '#f0f0f0'
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'left',
    color: '#f0f0f0'
  },
  input : {
    borderWidth: 1,
    borderColor: '#a0a0a0ff',
    padding: 10,
    borderRadius: 6,
    color: '#ffffff9f'
  },
  button: {
    backgroundColor : '#d7de21',
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  linkText : {
    textDecorationLine : 'underline',
    paddingLeft: 3
  },
  inputDiv : {
    gap: 5
  },
  error : {
    color : 'red'
  }
});