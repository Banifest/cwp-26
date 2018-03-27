const YAML = require('yamljs');

module.exports = (res, items, contentType) =>
{
    if (contentType === 'application/yaml')
    {
        res.setHeader('content-type', 'application/yaml');
        res.send(YAML.stringify(items));
    }
    else
    {
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify(items));
    }
}