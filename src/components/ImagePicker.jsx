import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function ImagePicker({ images = [], setImages }) {
  const token = sessionStorage.getItem('token') ?? '';

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [imageData, setImageData] = useState('');

  const handleSelectFile = (e) => setFile(e.target.files?.[0] ?? null);

  useEffect(() => {
    // you can inspect file / imageData for debugging
    // console.log(file, imageData);
  }, [file, imageData]);

  const handleUpload = async () => {
    if (!file) return;

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const form = new FormData();
      form.append('my_file', file);

      const res = await axios.post('http://localhost:3500/parts/upload', form, config);

      setResponse(res.data);

      const newImage = {
        _id: res.data.asset_id,
        url: res.data.url,
        fileName: res.data.public_id,
      };

      setImageData(newImage);

      setImages([...images, newImage]);
    } catch (error) {
      // avoid alert(); surface the error in component state and log
      setResponse({ error: error?.message ?? 'Upload failed' });
      // keep console for dev debugging
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {file && <div style={{ textAlign: 'center' }}>{file.name}</div>}
      <div className="vh1-spacer" />
      <input id="file" type="file" onChange={handleSelectFile} multiple={false} />
      <code>
        {Object.keys(response).length > 0
          ? Object.keys(response).map((key) => (
              <p className="output-item" key={key}>
                <span>{key}:</span>
                <span>{typeof response[key] === 'object' ? 'object' : String(response[key])}</span>
              </p>
            ))
          : null}
      </code>
      {file && (
        <button type="button" onClick={handleUpload} className="btn-green">
          {loading ? 'uploading...' : 'upload to cloudinary'}
        </button>
      )}
    </div>
  );
}

ImagePicker.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      url: PropTypes.string,
      fileName: PropTypes.string,
    })
  ),
  setImages: PropTypes.func.isRequired,
};

ImagePicker.defaultProps = {
  images: [],
};

export default ImagePicker;
