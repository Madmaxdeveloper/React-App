import { useState } from 'react'
import styles from '../styles/home.module.css'

import {addPost} from '../api'
import { useToasts } from 'react-toast-notifications'
import {usePosts} from '../hooks'

const CreatePost = () => {
    const [post, setPost] = useState('')
    const [addingPost, setAddingPost] = useState(false)
    const {addToast} = useToasts()
    const posts = usePosts()

    const handleAddPostCliclk = async() => {
        setAddingPost(true)
        // do  some checks
        const response = await addPost(post)

        if(response.success){
            setPost('')
            posts.addPostToState(response.data.post)
            addToast('Post created successfully', {
                appearance: 'success'
            })
        }else{
            addToast(response.message, {
                appearance: 'error'
            })
        }
        setAddingPost(false)
    }

    return ( 
        <div className={styles.createPost}>
            <textarea 
            classname={styles.addPost}
            value={post}
            onChange={(e) => setPost(e.target.value)}
            />

            <div>
                <button 
                className={styles.addPostBtn}
                onClick={handleAddPostCliclk}
                disabled={addingPost}
                >
                    {addingPost ? 'Adding post...' : 'Add Post'}
                </button>
            </div>
        </div>
    )
}
export default CreatePost