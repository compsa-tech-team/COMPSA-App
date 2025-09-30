import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LogInPage() {

  const router = useRouter()

  type accountErrors = {
    email?: string;
    password?: string;
  }

    const [logInForm, setLogInForm] = useState({
        'email' : '',
        'password': '',
    })
    const [errors, setErrors] = useState<accountErrors>({})

    const handleCreateAccount = () => {
      const newErrors: accountErrors = {}
      if (!logInForm.email.trim()) {
        newErrors.email = "Email is required"
      }
      else if (!logInForm.email.endsWith("@queensu.ca") && !logInForm.email.endsWith("@compsa.queensu.ca")) {
        newErrors.email = "Email must end with @queensu.ca or @compsa.queensu.ca"
      }
      
      if (!logInForm.password.trim()) {
        newErrors.password = "Password is required"
      }

      setErrors(newErrors)
    }

    return (
        <LinearGradient style={styles.container}
          colors={['#1f1f1f', '#1f1f1f', '#381c64']}
          locations={[0, 0.3, 1]}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Log In</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>
                <View style={styles.inputDiv}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Queen's Email"
                        value={logInForm.email}
                        onChangeText={(email) => setLogInForm((prevForm) => ({...prevForm, 'email': email}))}
                    ></TextInput>
                    {errors.email && <Text style={styles.error}>*{errors.email}</Text>}
                </View>
                <View style={styles.inputDiv}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        value={logInForm.password}
                        onChangeText={(password) => setLogInForm((prevForm) => ({...prevForm, 'password': password}))}
                    ></TextInput>
                    {errors.password && <Text style={styles.error}>*{errors.password}</Text>}
                </View>
                <Pressable>
                  <Text style={styles.linkText}>
                    Forgot your password? 
                  </Text>
                </Pressable>
               <TouchableOpacity onPress={() => handleCreateAccount()} style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
               </TouchableOpacity>
               <Text style={styles.subtitle}>New to COMPSA? 
                <Pressable onPress={() => router.push('/createAccount')}>
                  <Text style={styles.linkText}>
                    Create an account 
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
    width: '85%',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: '#f0f0f0'
  },
  subtitle: {
    fontSize: 14,
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
    paddingLeft: 3,
    color: '#f0f0f0'
  },
  inputDiv : {
    gap: 5
  },
  error : {
    color : 'red'
  }
});