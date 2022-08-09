import styles from '../styles/components/Avatar.module.css';

const Avatar = ({ 
    src = '', 
    alt = 'avatar' 
  }) => (
  <div className={styles.avatar}>
    {src ? <img src="avatarIMG.png" alt={alt} /> : null}
  </div>
);

export default Avatar;
