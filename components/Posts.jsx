import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {addLikeBookmark, getLikeBookmark} from '../services/postapi.js'


const jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJub2Foc29sb21vbiIsImlhdCI6MTY4NDU0MDM0NSwiZXhwIjoxNjg1MTQ1MTQ1fQ.AWHJkx73SUrxnxOIMh_IMHgZuRHTn6-0bYIiH1Gpb_w';

const Comment = ({author, text}) => (
    <View style={styles.comment}>
        <Text style={styles.commentAuthor}>{author}:</Text>
        <Text style={styles.commentText}>{text}</Text>
    </View>
)

const formatDateAndTime = (dateString) => {
    const dateObj = new Date(dateString);
    const now = new Date();
    const timeDifference = now - dateObj;
    const twentyFourHours = 24 * 60 * 60 * 1000;

    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString([], {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
    }).replace(/^0+/, '');

    if (timeDifference < twentyFourHours) {
        return `${formattedTime}`;
    } else {
        return `${formattedDate}`;
    }
};

function Post({id, title, body, category, username, lastModifiedDate}) {

    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [bookmarkBtnStyle, setBookmarkBtnStyle] = useState(styles.bookmarkBtn);
    const [likeBtnStyle, setLikeBtnStyle] = useState(styles.likeBtn);
    const likeText = liked ? '💖' : '❤';
    const bookmarkText = bookmarked ? '📚' : '💾';
    const handleLikePress = () => {
        setLiked(prevLiked => !prevLiked);
    };

    const handleBookmarkPress = () => {
        setBookmarked(prevBookmarked => !prevBookmarked);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postInteractions = await getLikeBookmark(id);
                setLiked(postInteractions.liked);
                setBookmarked(postInteractions.bookmark);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);


    useEffect(() => {
        addLikeBookmark(id, liked, bookmarked);
        if (liked) {
            setLikeBtnStyle(styles.likeBtnActive);
        } else {
            setLikeBtnStyle(styles.likeBtnInactive);
        }
    }, [liked]);

    useEffect( () => {
        addLikeBookmark(id, liked, bookmarked);
        if (bookmarked) {
            setBookmarkBtnStyle(styles.bookmarkBtnActive);
        } else {
            setBookmarkBtnStyle(styles.bookmarkBtnInactive);
        }
    }, [bookmarked]);


    return (
            <View style={styles.post}>
                <Text style={styles.postTitle}>{title}</Text>
                <Text style={styles.postContent}>{body}</Text>
                <View style={styles.postMeta}>
                    <Text style={styles.category}>{category}</Text>
                    <Text style={styles.author}>{username}</Text>
                    <Text style={styles.date}>{formatDateAndTime(lastModifiedDate)}</Text>
                </View>
                <View style={styles.postActions}>
                    <TouchableOpacity style={likeBtnStyle} onPress={handleLikePress}><Text>{likeText}</Text></TouchableOpacity>
                    <TouchableOpacity style={bookmarkBtnStyle} onPress={handleBookmarkPress}><Text>{bookmarkText}</Text></TouchableOpacity>
                </View>
            </View>
    );
}

export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://appconnectify.herokuapp.com/posts',{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={"large"}/>
            </View>
        );
    }


    return (
        <View style={styles.postWrapper}>
            <View>
                {posts.map((item, index) => (
                    <Post key={index} {...item} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    postWrapper: {
        marginTop: 50
    },
    post: {
        padding: 20,
        backgroundColor: '#1C1C1C',
        borderRadius: 8,
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30
    },
    postTitle: {
        color: '#cccccc',
        fontWeight: 'bold',
        fontSize: 25,
    },
    postContent: {
        color: '#a4a4a4',
        fontSize: 16,
        marginTop: 10,
    },
    postMeta: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    likeBtn: {
        backgroundColor: '#416caa',
        borderRadius: 25,
        padding: 15
    },
    likeBtnActive: {
        backgroundColor: 'rgb(170, 45, 75)',
        borderRadius: 25,
        padding: 15
    },
    likeBtnInactive: {
        backgroundColor: '#416caa',
        borderRadius: 25,
        padding: 15
    },
    bookmarkBtn: {
        backgroundColor: '#416caa',
        borderRadius: 25,
        padding: 15
    },
    bookmarkBtnActive: {
        backgroundColor: 'rgb(153, 101, 60)',
        borderRadius: 25,
        padding: 15
    },

    bookmarkBtnInactive: {
        backgroundColor: '#416caa',
        borderRadius: 25,
        padding: 15
    },
    author: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#cccccc'
    },
    category: {
        fontWeight: 'bold',
        color: '#a4a4a4',
        fontSize: 15,
    },
    date: {
        color: 'rgba(187,187,187,0.6)'
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    commentField: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        marginRight: 10,
        padding: 8,
    },
    seeCommentsContainer: {
        marginTop: 10,
    },
    comments: {
        marginTop: 10,
    },
    comment: {
        flexDirection: 'row',
        marginTop: 5,
    },
    commentAuthor: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    commentText: {

    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});