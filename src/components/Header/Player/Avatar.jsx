import avatarImage from "../../../assets/avatar.png";

const AvatarImage = ({ size }) => {
  const className = `Image ${size}`;
  return <img className={className} src={avatarImage} alt="Your Avatar" />;
};

export default AvatarImage;
