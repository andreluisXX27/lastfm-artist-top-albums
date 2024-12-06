import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList} from 'react-native';

const API_KEY = "ae0050c3ef5865c95d6982924c7de685"
const URL = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="
const PARAMS = `&api_key=${API_KEY}&format=json&limit=10`

export default function App() {
    const [artistInput, setArtistInput] = useState('');
    const [artistData, setArtistData] = useState([]);

    // useEffect(() => {
    // })
    const fetchArtist = async () => {
        const response = await fetch(URL + artistInput + PARAMS)
        const data = await response.json()
        setArtistData(data.toptracks.track)
        console.log(data.toptracks.track)
    }
    
    return (
        <View className="flex-1 bg-white justify-center p-8 gap-2">
            <Text className="text-2xl font-roboto font-bold">Procurar artista</Text>
            <TextInput 
                value={artistInput}
                onChangeText={setArtistInput}
                placeholder='Digite o nome de um artista'
                className="border border-slate-200 rounded-lg px-4 py-2"
            />
            <TouchableOpacity className="p-4 bg-blue-600 rounded-lg items-center" onPress={fetchArtist}>
                <Text className="text-white font-bold">
                    Procurar
                </Text>
            </TouchableOpacity>
            
            <View>
                <FlatList
                    data={artistData}
                    // keyExtractor={item => item.id}
                    renderItem={({item}) => 
                        <View>
                            <Text>Nome da música <Text className="font-bold">{item.name}</Text></Text>
                            <Text>Ouvintes <Text className="font-bold">{item.listeners}</Text></Text>
                        </View>
                    }
                    ItemSeparatorComponent={() => <View style={{height: 10}} />}
                />
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}
