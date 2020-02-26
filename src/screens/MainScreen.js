import React, { useEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import AppHeaderIcon from '../components/AppHeaderIcon'
import PostList from '../components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts } from '../store/actions/post'
import { THEME } from '../theme'

const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadPosts())
    }, [])

    const allPosts = useSelector(state => state.post.allPosts)
    const loading = useSelector(state => state.post.loading)

    const openPostHandler = post => {
        navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
    }

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator color={THEME.MAIN_COLOR}></ActivityIndicator>
            </View>
        )
    }

    return <PostList data={allPosts} onOpen={openPostHandler}></PostList>
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Мой блог',
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title='Take photo'
                iconName='ios-camera'
                onPress={() => navigation.push('Create')}
            ></Item>
        </HeaderButtons>
    ),
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title='Toggle Drawer'
                iconName='ios-menu'
                onPress={() => navigation.toggleDrawer()}
            ></Item>
        </HeaderButtons>
    ),
})

export default MainScreen
