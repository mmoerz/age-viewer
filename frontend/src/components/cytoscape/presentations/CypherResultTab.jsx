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
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faDownload } from '@fortawesome/free-solid-svg-icons';
import IconGraph from '../../../icons/IconGraph';

import styles from './CypherResultCytoscape.module.scss';
import cytoscapeInstanceProp from '../utils/cytoscapeInstanceProp';

class CypherResultTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refKey = props.refKey;
    this.tabType = props.tabType;
    this.setActiveTab = props.setActiveTab;
    // this.activeTab = props.activeTab;
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
    return (
      <div className={classNames(styles['btn-area'], 'col-md-2', 'p-0')}>
        {/* First row: Graph + Table */}
        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}> */}
        <div className={classNames(styles['btn-area-column'], 'col-md-6', 'p-0')} id={`${this.refKey}-graph1`}>
          <button
            className={classNames(
              styles['btn-area-btn'],
              this.tabType === 'graph' ? styles['btn-area-btn.active'] : '',
            )}
            type="button"
            onClick={() => { this.setActiveTab('graph'); this.setIsTable(false); }}
          >
            <IconGraph />
            <br />
            <b>Graph</b>
          </button>

          <button
            className={styles['btn-area-btn']}
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
        <div className={styles['btn-area-divider']} />

        {/* Table button */}
        <div className={classNames(styles['btn-area-column'], 'col-md-6', 'p-0')} id={`${this.refKey}-graph2`}>
          <button
            className={classNames(
              styles['btn-area-btn'],
              this.tabType === 'table' ? styles['btn-area-btn.active'] : '',
            )}
            type="button"
            onClick={() => { this.setActiveTab('table'); this.setIsTable(true); }}
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
  tabType: PropTypes.string.isRequired,
  // activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  cytoRef: cytoscapeInstanceProp.isRequired,
  setIsTable: PropTypes.func.isRequired,
};

export default CypherResultTab;
