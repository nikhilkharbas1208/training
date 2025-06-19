import React from 'react';

const ActionButtonsRenderer = (props) => {
  const { data } = props;

  const handleEdit = () => {
    console.log('Edit clicked for:', data);
    // Implement your edit logic here
  };

  const handleSave = () => {
    console.log('Save clicked for:', data);
    // Implement your save logic here
  };

  const handleDelete = () => {
    console.log('Delete clicked for:', data);
    // Implement your delete logic here
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ActionButtonsRenderer;
