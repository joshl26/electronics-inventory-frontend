import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from './Check';
import ClearIcon from './Clear';
import styles from './FilesList.module.css';

function FilesListItem({ name, id, onClear, uploadComplete }) {
  const handleClear = useCallback(() => {
    onClear(id);
  }, [id, onClear]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleClear();
      }
    },
    [handleClear]
  );

  return (
    <li className={styles.files_list_item}>
      <span className={styles.files_list_item_name}>{name}</span>
      {!uploadComplete ? (
        <button
          type="button"
          className={styles.files_list_item_clear}
          aria-label="remove file"
          onClick={handleClear}
          onKeyDown={handleKeyDown}
        >
          <ClearIcon />
        </button>
      ) : (
        <span role="img" className={styles.file_list_item_check} aria-label="upload complete">
          <CheckIcon />
        </span>
      )}
    </li>
  );
}

FilesListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClear: PropTypes.func.isRequired,
  uploadComplete: PropTypes.bool,
};

FilesListItem.defaultProps = {
  uploadComplete: false,
};

function FilesList({ files, onClear, uploadComplete }) {
  return (
    <ul className={styles.files_list}>
      {files.map(({ file, id }) => (
        <FilesListItem
          name={file.name}
          key={id}
          id={id}
          onClear={onClear}
          uploadComplete={uploadComplete}
        />
      ))}
    </ul>
  );
}

FilesList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  onClear: PropTypes.func.isRequired,
  uploadComplete: PropTypes.bool,
};

FilesList.defaultProps = {
  uploadComplete: false,
};

export default FilesList;
