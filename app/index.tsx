import { auth } from "@/services/firebase";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Button, TextInput, View } from "react-native";


export default function Home(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login realizado com sucesso! User: " + userCredential.user.email);
            router.push("/listaAlunos");
        })
        .catch((error) => alert(error.message));
        };

    return (
        <View>
            <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput placeholder="Senha" secureTextEntry onChangeText={setPassword} value={password} />
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    )
}