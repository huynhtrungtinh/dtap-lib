import clsx from 'clsx';
import PropTypes from "prop-types";
import React from "react";
import cardHeaderStyle from "../../css/cardHeaderStyle";

function CardHeader({...props}) {
  const classes = cardHeaderStyle();
  const {
    className,
    children,
    color,
    plain,
    stats,
    icon,
    ...rest
  } = props;
  const cardHeaderClasses = clsx({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  // classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "secondary"
  ]),
  plain: PropTypes.bool,
  stats: PropTypes.bool,
  icon: PropTypes.bool
};
export {CardHeader};
export default CardHeader;
