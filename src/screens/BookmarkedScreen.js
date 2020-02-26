import React, { useEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import AppHeaderIcon from '../components/AppHeaderIcon'
import PostList from '../components/PostList'
import { loadPosts } from '../store/actions/post'

const BookmarkedScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadPosts())
    }, [])

    const allPosts = useSelector(state => state.post.bookedPosts)

    const openPostHandler = post => {
        navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
    }

    return <PostList data={allPosts} onOpen={openPostHandler}></PostList>
}

BookmarkedScreen.navigationOptions = navigation => ({
    headerTitle: 'Избранное',
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

export default BookmarkedScreen
