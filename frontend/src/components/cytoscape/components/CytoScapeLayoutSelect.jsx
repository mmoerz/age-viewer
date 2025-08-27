import React from 'react';
import PropTypes from 'prop-types';
import { selectableLayouts } from '../CytoscapeLayouts';

function CytoScapeLayoutSelect({
  cytoscapeLayoutName,
  setCytoscapeLayoutByName,
}) {
  return (
    <div className="d-flex align-items-center layout-select-container">
      <div className="layout-select-label mr-2">
        Layout :
      </div>
      <div className="col-8 px-2">
        <select
          id="selectLayout"
          className="form-select-sm"
          defaultValue={cytoscapeLayoutName}
          onChange={(e) => setCytoscapeLayoutByName(e.target.value)}
        >
          {Object.keys(selectableLayouts).map((name) => (
            <option key={name} value={name}>{selectableLayouts[name].label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
CytoScapeLayoutSelect.propTypes = {
  cytoscapeLayoutName: PropTypes.string.isRequired,
  setCytoscapeLayoutByName: PropTypes.func.isRequired,
};
export default CytoScapeLayoutSelect;
