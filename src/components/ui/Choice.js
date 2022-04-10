import { View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export const Choice = ({ name, color }) => {
    const { colors } = useTheme()
    return (
        <View>
            <FontAwesome5 name={name} size={70}
                color={name === 'ban' ? 'red' : colors.primary} />
        </View>
    )
}