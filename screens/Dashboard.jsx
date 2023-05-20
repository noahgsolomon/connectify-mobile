import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header';
import GamePanel from '../components/Games';
import Posts from "../components/Posts";

export default function Dashboard() {


    return (
      <View>
          <Header buttons={['😇', '🔔', '🔎', '💬']} />
          <GamePanel />
          <Posts />
      </View>
    );
}