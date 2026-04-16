import { firestore } from '@/services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

interface Aluno {
    id: string;
    nome: string;
}

export default function Home(){
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'Alunos'));
                const lista: Aluno[] = [];
                querySnapshot.forEach((doc) => {
                    lista.push({ id: doc.id, ...doc.data() } as Aluno);
                });
                setAlunos(lista);
            } catch (error) {
        console.error("Erro ao buscar alunos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;


    return (
            <View style={{ flex: 1 }}>
            <FlatList
                data={alunos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#000' }}>
                    <Text style={{ fontSize: 16 }}>{item.nome}</Text>
                </View>
                    )}
                    ListEmptyComponent={<Text>Nenhum aluno encontrado.</Text>}
      />
        </View>
    );

}