# filetype

This is a wrapper node around the [file-type](https://www.npmjs.com/package/file-type) npmjs package.

## Usage

The `msg.payload` should either be a `Buffer` or a `stream.Readable` and the filetype will attach a filetype attribute to the msg object. If file-type can cannot not identify the data, the attribute is set to undefined.

The attribute added to the msg object is `filetype`.


### Artifacts

- [NPMjs Package]()
- [Node-RED node package]()
- [GitHub Repo](https://github.com/gorenje/node-red-contrib-filetype)
- The flow that maintains this [codebase](https://flowhub.org/f/578e0db8206559d8).
- [Examples in flow form](https://flowhub.org/f/0abb8904250e3eb6)