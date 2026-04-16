import { firestore } from '@/services/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

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

  const excluirAluno = async (id: string) => {
  try {
    // Cria a referência ao documento específico dentro da coleção
    await deleteDoc(doc(firestore, 'Alunos', id));

    // Remove do estado local para sumir da tela instantaneamente
    setAlunos(alunos.filter(aluno => aluno.id !== id));
    
    alert("Aluno removido!");
  } catch (error) {
    console.error("Erro ao excluir:", error);
  }
};


    return (
            <View style={{ flex: 1 }}>
            <FlatList
      data={alunos}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ marginTop: 20 }}
      renderItem={({ item }) => (
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: 15, 
          borderBottomWidth: 1, 
          borderColor: '#eee' 
        }}>
          <Text style={{ fontSize: 16 }}>{item.nome}</Text>
          
          {/* Botão de Excluir ao lado de cada nome */}
          <TouchableOpacity 
            onPress={() => excluirAluno(item.id)}
            style={{ backgroundColor: '#e74c3c', padding: 8, borderRadius: 5 }}
          >
            <Text style={{ color: 'white' }}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    />
        </View>
    );

}