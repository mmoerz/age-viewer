/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faDownload } from '@fortawesome/free-solid-svg-icons';
import cytoscape from 'cytoscape';
import IconGraph from '../../icons/IconGraph';

class CypherResultTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refKey = props.refKey;
    this.currentTab = props.currentTab;
    this.cytoRef = props.cytoRef;
    this.setIsTable = props.setIsTable;
  }

  handleExportSvg() {
    if (!this.cytoRef.current) {
      // Cytoscape instance is not ready yet!
      return;
    }
    const svgContent = this.cytoRef.current.svg({ full: true, scale: 1 });
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'graph-export.svg';
    link.click();

    URL.revokeObjectURL(url);
  }

  render() {
    const activeTab = (refKey, tabType) => {
      if (tabType === 'graph') {
        document.getElementById(`${refKey}-${tabType}`).classList.add('selected-frame-tab');
        document.getElementById(`${refKey}-${tabType}`).classList.remove('deselected-frame-tab');
        document.getElementById(`${refKey}-table`).classList.add('deselected-frame-tab');
        document.getElementById(`${refKey}-table`).classList.remove('selected-frame-tab');
      } else if (tabType === 'table') {
        document.getElementById(`${refKey}-${tabType}`).classList.add('selected-frame-tab');
        document.getElementById(`${refKey}-${tabType}`).classList.remove('deselected-frame-tab');
        document.getElementById(`${refKey}-graph`).classList.add('deselected-frame-tab');
        document.getElementById(`${refKey}-graph`).classList.remove('selected-frame-tab');
      }
    };
    return (
      <div className="legend-button-area col-md-2 p-0">
        {/* First row: Graph + Table */}
        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}> */}
        <div className="legend-button-area-column col-md-6 p-0" id={`${this.refKey}-graph1`}>
          <button
            className={`legend-button-area-btn ${this.currentTab === 'graph' ? 'active' : ''}`}
            type="button"
            onClick={() => { activeTab(this.refKey, 'graph'); this.setIsTable(false); }}
          >
            <IconGraph />
            <br />
            <b>Graph</b>
          </button>

          <button
            className="legend-button-area-btn"
            type="button"
            onClick={() => {
              if (typeof this.handleExportSvg !== 'undefined') {
                this.handleExportSvg();
              }
            }}
          >
            <FontAwesomeIcon icon={faDownload} style={{ fontSize: '20px' }} />
            <br />
            <b>Export</b>
          </button>
        </div>

        {/* Divider */}
        <div className="legend-button-area-divider" />

        {/* Table button */}
        <div className="legend-button-area-column col-md-6 p-0" id={`${this.refKey}-graph2`}>
          <button
            className={`legend-button-area-btn ${this.currentTab === 'table' ? 'active' : ''}`}
            type="button"
            onClick={() => { activeTab(this.refKey, 'table'); this.setIsTable(true); }}
          >
            <FontAwesomeIcon icon={faTable} style={{ fontSize: '25px' }} />
            <br />
            <b>Table</b>
          </button>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

CypherResultTab.propTypes = {
  refKey: PropTypes.string.isRequired,
  currentTab: PropTypes.string.isRequired,
  cytoRef: PropTypes.shape({ current: PropTypes.instanceOf(cytoscape.Core) }).isRequired,
  setIsTable: PropTypes.func.isRequired,
};

export default CypherResultTab;
