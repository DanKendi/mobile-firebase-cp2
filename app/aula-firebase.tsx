import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { auth } from "../services/firebase";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            alert(`Login successful! With email: ${email}`);
            const token = await credential.user.getIdToken();
            console.log("Token:", token);
        }catch (error) {
            alert(`Login failed! ${error}`);
        }
    }

    const signUp = async () => {
        try {
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            alert(`Sign Up successful! With email: ${email}`);
            const token = await credential.user.getIdToken();
            console.log("Token:", token);
        } catch (error) {
            alert(`Sign Up failed! ${error}`);
        }
    }

    return (
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
            <Button title="Login" onPress={login}/>
            <Button title="Sign Up" onPress={signUp}/>
        </View>
    );
}