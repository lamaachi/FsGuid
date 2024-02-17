import React, { useState, useEffect } from 'react';
import { Alert,View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { collection, addDoc, serverTimestamp, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import db from '../../db/firebaseStore';
import auth from '../../auth/firebase';
import { Card } from "react-native-elements";
import { onAuthStateChanged, currentUser, getAuth } from 'firebase/auth';
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole,setUserRole] = useState("")

  useEffect(() => {
    fetchCommentsData()
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const  role  = await fetchUserRole(user.email);
        setUserRole(role);
        setUserEmail(user.email)
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
      setInterval(()=>{
        fetchCommentsData()
      },2000);
  }, []);
  //Fetch comments from Firestore
  const fetchCommentsData = async () => {
    try {
      const commentsCollection = collection(db, 'comments');
      const commentsSnapshot = await getDocs(commentsCollection);
      
      const commentsData = [];
      commentsSnapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() });
      });
  
      // Sort comments by createdAt timestamp in descending order
      commentsData.sort((a, b) => b.createdAt - a.createdAt);
  
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comment data:", error);
    }
  };


  const removeComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      fetchCommentsData(); // Fetch updated comments after removal
    } catch (error) {
      console.error('Error removing comment:', error);
    }
  };

  const removeCommentHandler = (id) => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeComment(id);
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  //fetch user Role
  const fetchUserRole = async (userEmail) => {
    try {
      const usersCollection = collection(db, "users");
      const q = query(
        usersCollection,
        where("email", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);
      let role = "";
      querySnapshot.forEach((doc) => {
        role = doc.data().role;
      });
      return role;
    } catch (error) {
      console.error("Error fetching user role:", error);
      return "";
    }
  };


  // Add a new comment to Firestore
  const addComment = async () => {
    if (!newComment) {
      return;
    }
    
    try {
      const commentsCollection = collection(db, 'comments');
      const userEmail = auth.currentUser?.email;
      const userName = userEmail ? userEmail.split('@')[0] : 'Anonymous'; // Extract user name before "@" symbol
      await addDoc(commentsCollection, {
        content: newComment,
        createdAt: serverTimestamp(),
        user: userName, // Use the extracted user name
      });
      console.log("serverTimestamp  "+serverTimestamp)
      setNewComment(''); // Clear the input field after adding the comment
      fetchCommentsData(); // Fetch updated comments from Firestore
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      {(userEmail.split('@')[0] === item.user || userRole === "Admin") && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeCommentHandler(item.id)}
        >
          <FontAwesome name="trash" size={25} color="red" />
        </TouchableOpacity>
      )}
      <Text style={styles.commentContent}>{item.content}</Text>
      <Text style={styles.commentInfo}>
        {item.user}
      </Text>
    </View>
  );
  
  const formatTimestamp = (timestamp) => {
    // Convert Firestore timestamp to JavaScript Date object
      const date = timestamp.toDate();
    
    // Format the date as per your requirement
    return date?`${date.toDateString()} ${date.toLocaleTimeString()}`:null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={newComment}
        onChangeText={setNewComment}
      />
      <TouchableOpacity style={styles.button} onPress={addComment}>
        <Text style={styles.buttonText}>Add Comment</Text>
      </TouchableOpacity>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  title: {
    textAlign:"center",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6c757d'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentItem: {
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  commentContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  commentInfo: {
    fontSize: 12,
    color: 'gray',
  },
  commentItem: {
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    position: 'relative', // Add this to position the button relative to the comment
  },
  
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
});

export default Comments;
