import React from 'react';
import { Text } from 'react-native';
import { styles } from '../TextTitle/styles';


const Home: React.FC = ({children }) => {
    return (
        <Text style={styles.titleText}>{children}</Text>
    );
}

export default Home;