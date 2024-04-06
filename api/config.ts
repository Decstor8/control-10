import path from "path";

const rootPath = __dirname;

const sourceConfig = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
};

export default sourceConfig;