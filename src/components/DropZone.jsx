import React from 'react';
import PropTypes from 'prop-types';
import styles from './DropZone.module.scss';

function Banner({ onClick, onDrop }) {
  const handleDragOver = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const { dataTransfer } = ev;
    if (dataTransfer) dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const { dataTransfer } = ev;
    if (dataTransfer && typeof onDrop === 'function') {
      onDrop(dataTransfer.files);
    }
  };

  const handleKeyDown = (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      if (typeof onClick === 'function') onClick();
    }
  };

  return (
    <div
      className={styles.banner}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-label="Add files"
    >
      <span className={styles.banner_text}>Click to Add files</span>
      <span className={styles.banner_text}>Or</span>
      <span className={styles.banner_text}>Drag and Drop files here</span>
    </div>
  );
}

Banner.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

function DropZone({ onChange, accept }) {
  const inputRef = React.useRef(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChange = (ev) => {
    if (ev.target && ev.target.files) onChange(ev.target.files);
  };

  const handleDrop = (files) => {
    onChange(files);
  };

  return (
    <div className={styles.wrapper}>
      <Banner onClick={handleClick} onDrop={handleDrop} />
      <input
        type="file"
        aria-label="add files"
        className={styles.input}
        ref={inputRef}
        multiple
        onChange={handleChange}
        accept={accept.join(',')}
      />
    </div>
  );
}

DropZone.propTypes = {
  accept: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

DropZone.defaultProps = {
  accept: ['*'],
  onChange: () => {},
};

export { DropZone };
export default DropZone;
