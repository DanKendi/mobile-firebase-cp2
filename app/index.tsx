import { firestore } from "@/services/firebase";
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Home(){
    const [score1, setScore1] = React.useState('');
    const [score2, setScore2] = React.useState('');
    const [score3, setScore3] = React.useState('');
    const scoresCollection = collection(firestore, 'scores');
    const [nota1, setNota1] = React.useState('');
    const [nota2, setNota2] = React.useState('');
    const [nota3, setNota3] = React.useState('');

    // const getScore = async () => {
    //     setScore('');
    //     getDocs(scoresCollection).then((snapshot) => {
    //         var scoreText = '';
    //         snapshot.forEach((doc) => scoreText += 'Nota: ' + doc.data().value + '\n');
    //         setScore(scoreText);
    //     })
    // }

    const getNota1 = async () => {
        setScore1('');
        const docRef = doc(scoresCollection, "cp1");
        setScore1('CP1: ' + (await getDoc(docRef)).data()?.value);
    }

    const getNota2 = async () => {
        setScore2('');
        const docRef = doc(scoresCollection, "cp2");
        setScore2('CP2: ' + (await getDoc(docRef)).data()?.value);
    }

    const getNota3 = async () => {
        setScore3('');
        const docRef = doc(scoresCollection, "cp3");
        setScore3('CP3: ' + (await getDoc(docRef)).data()?.value);
    }

    const addNota1 = () =>{
        const parsedValue = parseFloat(nota1);
        if (isNaN(parsedValue)) return;
        const values = {
            value: parsedValue
        }
        const docRef = doc(firestore, 'scores', 'cp1')
        setDoc(docRef, values).then(() => setNota1(''));
    }

    const addNota2 = () =>{
        const parsedValue = parseFloat(nota2);
        if (isNaN(parsedValue)) return;
        const values = {
            value: parsedValue
        }
        const docRef = doc(firestore, 'scores', 'cp2')
        setDoc(docRef, values).then(() => setNota2(''));
    }
    
    const addNota3 = () =>{
        const parsedValue = parseFloat(nota3);
        if (isNaN(parsedValue)) return;
        const values = {
            value: parsedValue
        }
        const docRef = doc(firestore, 'scores', 'cp3')
        setDoc(docRef, values).then(() => setNota3(''));
    }   

    // const addDocumentId = () => {
    //     const values = {
    //         value: 5.8
    //     }
    //     const docRef = doc(firestore, 'scores', 'idDocument')
    //     setDoc(docRef, values)
    // }

    // const delDocumentId = () => {
    //     const docRef = doc(firestore, 'scores', 'idDocument')
    //     deleteDoc(docRef)
    // }

    return(
        <View>
            <Button title="Consultar CP1" onPress={getNota1}></Button>
            <Button title="Consultar CP2" onPress={getNota2}></Button>
            <Button title="Consultar CP3" onPress={getNota3}></Button>
            <TextInput 
                onChangeText={setNota1}
                value={nota1} 
                placeholder="Digite a nota CP1"
                keyboardType="numeric"
            />
            <TextInput 
                onChangeText={setNota2}
                value={nota2} 
                placeholder="Digite a nota CP2"
                keyboardType="numeric"
            />
            <TextInput 
                onChangeText={setNota3}
                value={nota3} 
                placeholder="Digite a nota CP3"
                keyboardType="numeric"
            />
            {/* <Button title="Adicionar" onPress={addDocument}></Button> */}
            <Button title="Adicionar nota cp1" onPress={addNota1}></Button>
            <Button title="Adicionar nota cp2" onPress={addNota2}></Button>
            <Button title="Adicionar nota cp3" onPress={addNota3}></Button>
            <Text>{score1}</Text>
            <Text>{score2}</Text>
            <Text>{score3}</Text>
            {/* <Button title="Deletar nota" onPress={delDocumentId}></Button> */}
        </View>
    )
}