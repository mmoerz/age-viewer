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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import LegendBadge from '../components/LegendBadge';
import styles from './CypherResultCytoscape.module.scss';

function callOnLabelClick(nextProps, type, label, legend) {
  nextProps.onLabelClick({
    type: 'labels',
    data: {
      type,
      backgroundColor: legend.color,
      fontColor: legend.fontColor,
      size: legend.size,
      label,
    },
  });
}

class CypherResultCytoscapeLegend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeBadges: new Map(),
      edgeBadges: new Map(),
      nodeLegendExpanded: false,
      edgeLegendExpanded: false,
      legendData: props.legendData,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newNodeBadges = prevState.nodeBadges;
    let newEdgeBadges = prevState.edgeBadges;
    if (nextProps.isReloading) {
      newNodeBadges = new Map();
      newEdgeBadges = new Map();
    }

    for (let i1 = 0; i1 < Object.entries(nextProps.legendData.nodeLegend).length; i1 += 1) {
      const [label, legend] = Object.entries(nextProps.legendData.nodeLegend)[i1];
      if (prevState.legendData !== undefined && prevState.legendData.nodeLegend !== undefined) {
        let isChanged = false;
        for (let i = 0; i < Object.entries(prevState.legendData.nodeLegend).length; i += 1) {
          const [prevLabel, prevLegend] = Object.entries(prevState.legendData.nodeLegend)[i];
          if (label === prevLabel && legend.color !== prevLegend.color) {
            isChanged = true;
          } else if (label === prevLabel && legend.size !== prevLegend.size) {
            isChanged = true;
          } else if (label === prevLabel && legend.caption !== prevLegend.caption) {
            isChanged = true;
          }
        }

        if (isChanged) {
          callOnLabelClick(nextProps, 'node', label, legend);
        }
      }

      newNodeBadges.set(
        label,
        <LegendBadge
          className="nodeLabel"
          key={uuid()}
          onClick={() => callOnLabelClick(nextProps, 'node', label, legend)}
          backgroundColor={legend.color}
          color={legend.fontColor}
        >
          {label}
        </LegendBadge>,
      );
    }

    for (let i = 0; i < Object.entries(nextProps.legendData.edgeLegend).length; i += 1) {
      const [label, legend] = Object.entries(nextProps.legendData.edgeLegend)[i];
      if (prevState.legendData !== undefined && prevState.legendData.edgeLegend !== undefined) {
        let isChanged = false;
        for (let i1 = 0; i1 < Object.entries(prevState.legendData.edgeLegend).length; i1 += 1) {
          const [prevLabel, prevLegend] = Object.entries(prevState.legendData.edgeLegend)[i1];
          if (label === prevLabel && legend.color !== prevLegend.color) {
            isChanged = true;
          } else if (label === prevLabel && legend.size !== prevLegend.size) {
            isChanged = true;
          } else if (label === prevLabel && legend.caption !== prevLegend.caption) {
            isChanged = true;
          }
        }

        if (isChanged) {
          callOnLabelClick(nextProps, 'edge', label, legend);
        }
      }
      newEdgeBadges.set(
        label,
        <LegendBadge
          className="edgeLabel"
          key={uuid()}
          onClick={() => callOnLabelClick(nextProps, 'edge', label, legend)}
          backgroundColor={legend.color}
          color={legend.fontColor}
        >
          {label}
        </LegendBadge>,
      );
    }

    return {
      nodeBadges: newNodeBadges,
      edgeBadges: newEdgeBadges,
      legendData: nextProps.legendData,
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
  }

  render() {
    const nodeLedgend = [];
    const edgeLedgend = [];

    const {
      nodeBadges, edgeBadges, nodeLegendExpanded, edgeLegendExpanded,
    } = this.state;

    nodeBadges.forEach((value) => nodeLedgend.push(value));
    edgeBadges.forEach((value) => edgeLedgend.push(value));

    return (
      <div className={classNames(styles['legend-area'], 'col-md-10', 'p-0')}>
        <div className="d-flex nodeLegend">
          <div className={`mr-auto legends legend ${nodeLegendExpanded ? 'expandedLegend' : ''}`}>
            <span>Node: </span>
            {nodeLedgend}
          </div>
          <button
            type="button"
            className="frame-head-button btn btn-link px-3"
            onClick={() => this.setState({ nodeLegendExpanded: !nodeLegendExpanded })}
            aria-label="Node Legend"
          >
            <FontAwesomeIcon
              icon={nodeLegendExpanded ? faAngleUp : faAngleDown}
            />
          </button>
        </div>
        <div className="d-flex edgeLegend">
          <div className={`mr-auto legends legend ${edgeLegendExpanded ? 'expandedLegend' : ''}`}>
            <span>Edge: </span>
            {edgeLedgend}
          </div>
          <button
            type="button"
            className="frame-head-button btn btn-link px-3"
            onClick={() => this.setState({ edgeLegendExpanded: !edgeLegendExpanded })}
            aria-label="Edge Legend"
          >
            <FontAwesomeIcon
              icon={edgeLegendExpanded ? faAngleUp : faAngleDown}
            />
          </button>
        </div>
      </div>
    );
  }
}

CypherResultCytoscapeLegend.propTypes = {
  legendData: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    nodeLegend: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    edgeLegend: PropTypes.any,
  }).isRequired,
  isReloading: PropTypes.bool.isRequired,
  // onLabelClick is used in getDerivedStateFromProps (and LegendBadge)
  // eslint-disable-next-line react/no-unused-prop-types
  onLabelClick: PropTypes.func.isRequired,
};

export default CypherResultCytoscapeLegend;
