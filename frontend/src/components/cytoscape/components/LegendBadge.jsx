import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function LegendBadge({
  className, color, backgroundColor, onClick, children,
}) {
  return (
    <span
      className={classNames(className, 'badge', 'px-3', 'py-2', 'mx-1', 'my-2')}
      style={{
        backgroundColor,
        color,
      }}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {children}
    </span>
  );
}
LegendBadge.propTypes = {
  className: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
