import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { searchUsers } from '../api'
import { useAuth } from '../hooks'
import styles from '../styles/navbar.module.css'

const Navbar = () => {
    const [results, setResults] = useState([])
    const [searchText, setSearchText] = useState('')
    const auth = useAuth()

    useEffect(() => {
      const fetchUsers = async () => {
        const response = await searchUsers(searchText);
    
        if (response.success) {
            setResults(response.data.users);
        }
      };
      
      if (searchText.length > 2) {
        fetchUsers();
      } else {
        setResults([]);
      }
    }, [searchText]);
    


    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to='/'>
                    <img 
                      alt='' 
                    //   codeial img
                      src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png' 
                    />
                </Link>
            </div>

            <div className={styles.searchContainer}>
                <img   
                    className={styles.searchIcon} 
                    src="https://cdn-icons.flaticon.com/png/512/3714/premium/3714975.png?token=exp=1653357338~hmac=4b4f250f01d4dd36bf99f7e73c976bb7"
                    alt='' 
                />
                <input 
                    placeholder="Search users" 
                    value={searchText} 
                    onChange={(e) => setSearchText(e.target.value)}
                />

                {results.length > 0 && (
                    <div className={styles.searchResults}>
                        <ul>
                            {results.map((user) => (
                                <li 
                                    classname={styles.searchResultsRow}
                                    key={`user-${user._id}`}
                                >
                                    <link to={`/user/${user._id}`}>
                                        <img
                                            src="https://cdn-icons.flaticon.com/png/512/4140/premium/4140037.png?token=exp=1652488890~hmac=8ec285b0a17cd90c4e7a1b43fb1e4d97' "
                                            alt=''
                                        />
                                        <span>{user.name}</span>
                                    </link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className={styles.rightNav}>
              {auth.user && <div className={styles.user}>
                    <Link to='/settings'>
                        <img 
                        //  dp login person
                          src='https://cdn-icons.flaticon.com/png/512/4140/premium/4140037.png?token=exp=1652488890~hmac=8ec285b0a17cd90c4e7a1b43fb1e4d97' 
                          alt='' 
                          className={styles.userDp} 
                        />
                    </Link>
                    <span>{auth.user.name}</span>
                </div>}

                <div className={styles.navLinks}>
                    <ul>
                        {auth.user ? (
                            <>
                              <li>
                                  <button onClick={auth.logout}>Logout</button>
                              </li>
                            </>
                        ) : (
                            <>
                              <li>
                                  <Link to='/login'>Login</Link>
                              </li>


                              <li>
                                  <Link to='/register'>Register</Link>
                              </li>

                            </>
                        )}
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar