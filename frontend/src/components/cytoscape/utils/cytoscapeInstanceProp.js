// A custom prop validator to check for a ref to a Cytoscape.js instance
export default function cytoscapeInstanceProp(props, propName, componentName) {
  const ref = props[propName];
  if (!ref || typeof ref.current !== 'object') return null;

  const inst = ref.current;
  if (typeof inst.add !== 'function' || typeof inst.remove !== 'function') {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected a ref to a Cytoscape.js instance.`,
    );
  }
  return null;
}
