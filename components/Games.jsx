import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const Games = ({ title, description, players, bgColor, gameJoinBtn }) => (
    <View style={[styles.gameItem, {backgroundColor: bgColor}]}>
        <Text style={styles.gameTitle}>{title}</Text>
        <Text style={styles.gameDescription}>{description}</Text>
        <View style={styles.gameMeta}>
            <Text style={styles.players}>{players} Players</Text>
        </View>
        <TouchableOpacity style={[styles.gameJoinBtn, {backgroundColor: gameJoinBtn}]}>
            <Text style={styles.gameJoinBtnText}>🕹️ Join</Text>
        </TouchableOpacity>
    </View>
)

export default function GamesPanel() {
    return (
        <View style={styles.gamesPanel}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Games
                    title="👑 Chess"
                    description="Engage in a game of wits and strategy. Will you be able to checkmate your opponent?"
                    players={2}
                    bgColor='#DAA520'
                    gameJoinBtn='#FFD700'
                />
                <Games
                    title="🧠 Trivia"
                    description="Test your knowledge across a wide range of topics in this exciting trivia game."
                    players={4}
                    bgColor='#4682B4'
                    gameJoinBtn='#87CEFA'
                />
                <Games
                    title="🧩 Puzzle"
                    description="Challenge your problem-solving skills with this fun and engaging puzzle game."
                    players={1}
                    bgColor='#228B22'
                    gameJoinBtn='#ADFF2F'
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    gamesPanel: {
        marginTop: 20,
    },
    gameItem: {
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        shadowColor: '#333',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        width: 300,
        margin: 10
    },
    gameTitle: {
        color: '#f0f0f0',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 10,
    },
    gameDescription: {
        color: '#fff',
        marginBottom: 10,
    },
    gameMeta: {},
    players: {
        color: '#f5f5f5',
        fontSize: 15,
        fontWeight: 'bold',
    },
    gameJoinBtn: {
        marginTop: 10,
        padding: 10,
        width: '50%',
        alignSelf: "center",
        borderRadius: 30,
        alignItems: "center"
    },
    gameJoinBtnText: {
        color: '#333',
        fontWeight: 'bold'
    }
});





