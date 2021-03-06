module.exports = [
  {
    title: "Getting Started",
    collapsable: false,
    children: prefix('getting-started', ['introduction', 'configuration']),
  },
  {
    title: "The Basic",
    collapsable: false,
    children: prefix('basic', ['testcase', 'define-environment', 'define-databases', 'define-routes']),
  },
  {
    title: "CLI Commander",
    path: uri('commander')
  },
  {
    title: "Integrations",
    path: uri('integrations'),
  },
  {
    title: "Troubleshooting",
    path: uri('troubleshooting')
  },
];

function prefix(prefix, children) {
  return children.map(child => uri(`${prefix}/${child}`));
}

function uri(uri) {
  return `/testbench/${uri}`;
}
