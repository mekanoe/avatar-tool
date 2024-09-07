import { groups } from "../groups.json";

export async function onRequest(context) {
  const groupName = context.params.group;

  if (!groups[groupName]) {
    return new Response("Group not found", { status: 404 });
  }

  const groupData = groups[groupName];
  const weights = groupData.weights;

  // TODO: weighted random
  const files = Object.keys(weights);
  const pickedFile = files[Math.floor(Math.random() * files.length)];

  const fullPath = `/${groupName}/${pickedFile}`;
  const url = new URL(context.request.url);
  url.pathname = fullPath;
  return context.env.ASSETS.fetch(url);
}
