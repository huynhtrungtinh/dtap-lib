import clsx from 'clsx';
import PropTypes from "prop-types";
import React from "react";
import cardIconStyle from "../../css/cardIconStyle";

function CardIcon({...props}) {
  const classes = cardIconStyle();
  const {className, children, color, ...rest} = props;
  const cardIconClasses = clsx({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

CardIcon.propTypes = {
  // classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "secondary"
  ])
};
export {CardIcon};
export default CardIcon;
