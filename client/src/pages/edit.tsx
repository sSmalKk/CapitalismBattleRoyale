import React, { useState, useEffect } from "react";
import { fetchById, updateEntry } from "../store/CentralizedDatabaseActions";
import { useNavigate, useParams } from "react-router-dom";
import * as Models from "../store/CentralizedModels"; // Import all models

const EditPage = ({ mode }) => {
  const { modelType, id } = useParams();
  const [entryData, setEntryData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use 'navigate' for navigation

  useEffect(() => {
    fetchEntryData();
  }, []);

  const fetchEntryData = async () => {
    setLoading(true);
    const data = await fetchById(mode, modelType, id);
    setEntryData(data);
    setLoading(false);
  };

  const handleChange = (e) => {
    setEntryData({ ...entryData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const modelFunction = Models[`${modelType}BodyData`]; // Get model function dynamically
    if (modelFunction) {
      const bodyData = modelFunction(entryData); // Generate the body data using the corresponding model
      await updateEntry(mode, modelType, id, bodyData);
      navigate(`/list/${modelType}`);
    } else {
      console.error(`Model function for ${modelType} not found.`);
    }
  };

  return (
    <div>
      <h1>Edit {modelType}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.keys(entryData).map((key) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="text"
                name={key}
                value={entryData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button onClick={handleSave}>Save</button>
        </form>
      )}
    </div>
  );
};

export default EditPage;
