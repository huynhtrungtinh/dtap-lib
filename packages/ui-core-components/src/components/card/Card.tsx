import clsx from 'clsx';
import PropTypes from "prop-types";
import React from "react";
import cardStyle from "../../css/cardStyle";

function Card({...props}) {
  const classes = cardStyle();
  const {
    className,
    children,
    plain,
    profile,
    chart,
    // tabIndex = -1,
    ...rest
  } = props;
  const cardClasses = clsx({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className]: className !== undefined
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  // classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  chart: PropTypes.bool
};
export {Card};
export default Card;
