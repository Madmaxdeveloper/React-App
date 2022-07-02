import styles from '../styles/home.module.css'
import { useAuth } from '../hooks'
import { Link } from 'react-router-dom'

const FriendsList = () => {
    const auth = useAuth()
    const { friends = [] } = auth.user

    return(
        <div className={styles.friendsList}>
            <div className={styles.header}>Friends</div>

            {friends && friends.length === 0 && (
                <div className={styles.noFriends}> No friends found! </div>
            )}

            {friends && 
              friends.map((friend) => (
                  <div key={`friend-${friend._id}`}>
                    <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
                        <div className={styles.friendsImg}>
                            <img 
                              src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1653266983~hmac=767a93aa96be153327e7cfffc1116b8b"
                              alt=""
                            />
                        </div>
                        <div className={styles.friendsName}>{friend.to_user.email}</div>
                    </Link>
                </div>
            ))}
        </div>

    )
}

export default FriendsList