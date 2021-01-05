import clsx from 'clsx';
import PropTypes from "prop-types";
import React from "react";
import cardBodyStyle from "../../css/cardBodyStyle";

function CardBody({...props}) {
  const classes = cardBodyStyle();
  const {className, children, plain, profile, ...rest} = props;
  const cardBodyClasses = clsx({
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
    [className]: className !== undefined
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  // classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool
};
export {CardBody};
export default CardBody;
