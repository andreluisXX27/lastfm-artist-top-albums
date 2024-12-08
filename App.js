import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { useBatteryLevel } from 'expo-battery';

const API_KEY = "5d2df7527e3aae5e2ce3b250fe868046"
const URL = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="
const PARAMS = `&api_key=${API_KEY}&format=json&limit=5`

export default function App() {
    const [artistInput, setArtistInput] = useState('');
    const [artistData, setArtistData] = useState([]);
    const batterylevel = useBatteryLevel();

    const fetchArtist = async () => {
        const response = await fetch(URL + artistInput + PARAMS)
        const data = await response.json()
        setArtistData(data.topalbums.album)
        console.log(data.topalbums.album)
    }
    
    return (
        <View className="flex-1 bg-white justify-center p-8 gap-2">
            <Text>Porcentagem da bateria: {batterylevel}</Text>
            <Text className="text-2xl font-bold">Procure um artista</Text>
            <TextInput 
                value={artistInput}
                onChangeText={setArtistInput}
                placeholder='Digite o nome de um artista'
                className="border border-slate-200 rounded-lg px-4 py-2"
            />
            <TouchableOpacity className="p-4 bg-green-400 rounded-lg items-center" onPress={fetchArtist}>
                <Text className="text-white font-bold">
                    Procurar
                </Text>
            </TouchableOpacity>
            
            <View>
                <FlatList
                    data={artistData}
                    renderItem={({item}) => 
                        <View>
                            <Text>Nome do album: <Text className="font-bold">{item.name}</Text></Text>
                            <Text>Plays: <Text className="font-bold">{item.playcount}</Text></Text>
                        </View>
                    }
                    ItemSeparatorComponent={() => <View style={{height: 10}} />}
                />
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}
