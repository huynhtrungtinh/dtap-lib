import clsx from 'clsx';
import PropTypes from "prop-types";
import React from "react";
import cardFooterStyle from "../../css/cardFooterStyle";

function CardFooter({...props}) {
  const classes = cardFooterStyle();
  const {
    className,
    children,
    plain,
    profile,
    stats,
    chart,
    ...rest
  } = props;
  const cardFooterClasses = clsx({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className]: className !== undefined
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  // classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  stats: PropTypes.bool,
  chart: PropTypes.bool
};
export {CardFooter};
export default CardFooter;
