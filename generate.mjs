import { glob } from "glob";
import { readFile } from "fs/promises";
import { dirname } from "path";

const readJSON = async (path) => {
  const text = await readFile(path);
  return JSON.parse(text);
};

const groupManifests = await glob("**/group.json");

const groups = {};

for (let groupManifest of groupManifests) {
  const groupName = dirname(groupManifest);

  groups[groupName] = await readJSON(groupManifest);
}

console.log(JSON.stringify({ groups }));
