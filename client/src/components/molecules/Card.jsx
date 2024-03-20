import styles from '../../styles/molecules/Card.module.css';

export const cardsData = [
  {
    imageFront: '/img/availables/adoptFront.jpg',
    imageBack: '/img/availables/adoptBack.png',
    title: 'Adopt',
    description: 'Get a friend',
    link: '#'
  },
  {
    imageFront: '/img/availables/rescueFront.jpg',
    imageBack: '/img/availables/rescueBack.png',
    title: 'Rescue',
    description: 'Provide support',
    link: '#'
  },
  {
    imageFront: '/img/availables/socializeFront.jpg',
    imageBack: '/img/availables/socializeBack.png',
    title: 'Socialize',
    description: 'Connect your pets',
    link: '#'
  },
];


export const Card = ({ imageFront, imageBack, title, description, link }) => {
  return (
    <div className={styles.card}>
      <div className={`${styles.cardFace} ${styles.cardFront}`}>
        <img className={styles.cardFrontImg} src={imageFront} alt={title} />
        <h3 className={styles.cardFrontH3}>{title}</h3>
      </div>
      <div className={`${styles.cardFace} ${styles.cardBack}`}>
        <h3 className={styles.cardBackH3}>{title}</h3>
        <img className={styles.cardBackImg} src={imageBack} alt={`${title} back`} />
        <p className={styles.cardBackP}>{description}</p>
        <div className={`${styles.cardBackLink} ${styles.cardHover}`}>
          <a className={styles.cardBackLinkA} href={link}>Details</a>
        </div>
      </div>
    </div>
  );
};