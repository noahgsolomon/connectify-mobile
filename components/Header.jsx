import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar} from 'react-native';

export default function Header({buttons}) {

    const [refresh, setRefresh] = useState(false);

    const handlePress = () => {
        setRefresh(!refresh);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.logo}>🌐 Connectify</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.nav}>
                {buttons.map((button, index) => (
                    <TouchableOpacity key={index} style={styles.navItem}>
                        <Text>{button}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS ===
        'android' ? (StatusBar.currentHeight || 0) : Platform.OS === 'ios' ? (Platform.isPad ? 30 : 40) : 0,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#ddd',
        marginTop: 10,
        marginBottom: 20
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20,
        marginLeft: 5,
        marginRight: 5
    },
    navItem: {
        marginLeft: 20,
        padding: 13,
        borderRadius: 15,
        backgroundColor: '#3d3d3d',
    },
});