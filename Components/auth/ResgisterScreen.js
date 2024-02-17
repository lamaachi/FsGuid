import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import auth from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import db from "../db/firebaseStore";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // // Send verification email
  const sendEmailVerificationUser = async (user) => {
    try {
      await sendEmailVerification(user);
      Alert.alert(
        "Verification Email Sent",
        "Please check your email for verification"
      );
    } catch (error) {
      console.error("Error sending verification email:", error);
      Alert.alert("Error", "Failed to send verification email");
    }
  };

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    //Regular expression to check if the email has the domain "@ucd.ac.ma"
    const emailRegex = /^[^\s@]+@ucd\.ac\.ma$/i;

    if (!emailRegex.test(email)) {
      Alert.alert(
        "Error",
        'Please enter a valid email with the domain "@ucd.ac.ma"'
      );
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // Continue with navigation or other actions
        navigation.replace("Login"); // Navigate to the main screen after successful registration

        // Send email verification
        await sendEmailVerificationUser(user);
        
        try {
          const usersCollection = collection(db, "users");
          await addDoc(usersCollection, {
            uid: user.uid,
            email: user.email,
            name: user.email.split("@")[0],
            role: "Visitor", // Set default role to regular
          });
          setLoading(false);
        } catch (error) {
          setLoading(fasle);
          console.error("Error adding user to users collection:", error);
        }
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        Alert.alert("Registration Failed", errorMessage);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Regiter to <Text style={{ color: "#637A9F" }}>FsGuid</Text>
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              placeholder="exemple@ucd.ac.ma"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={(text) => setPassword(text)}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={password}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleRegister} disabled={loading}>
              <View style={[styles.btn, { opacity: loading ? 0.5 : 1 }]}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.btnText}>Save</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login"); // Navigate to the RegisterScreen
              }}
              style={{ marginTop: "auto" }}
            >
              <Text style={styles.formFooter}>
                Do You have an account?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1d1d1d",
    marginTop: 120,
    marginBottom: 6,
    textAlign: "center",
  },
  formAction: {
    marginVertical: 24,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  formFooter: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#637A9F",
    borderColor: "#637A9F",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
