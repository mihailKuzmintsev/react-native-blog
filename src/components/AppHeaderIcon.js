import React from 'react'
import { View, Text, Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { THEME } from '../theme'

const AppHeaderIcon = props => {
    return (
        <HeaderButton
            {...props}
            iconSize={24}
            color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
            IconComponent={Ionicons}
        ></HeaderButton>
    )
}

export default AppHeaderIcon
