import clsx from 'clsx';
import PropTypes from "prop-types";
import React from "react";
import cardAvatarStyle from "../../css/cardAvatarStyle";

function CardAvatar({...props}) {
  const classes = cardAvatarStyle();
  const {children, className, plain, profile, ...rest} = props;
  const cardAvatarClasses = clsx({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [className]: className !== undefined
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
}

CardAvatar.propTypes = {
  // children: PropTypes.node.isRequired,
  className: PropTypes.string,
  profile: PropTypes.bool,
  plain: PropTypes.bool
};
export {CardAvatar};
export default CardAvatar;
