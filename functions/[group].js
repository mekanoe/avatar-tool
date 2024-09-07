import { groups } from "../groups.json";

export async function onRequest(context) {
  const groupName = context.params.group;

  if (!groups[groupName]) {
    return new Response("Group not found", { status: 404 });
  }

  const groupData = groups[groupName];
  const weights = groupData.weights;

  const pickedFile = weightedRandomKey(weights);
  console.log({ pickedFile });

  const fullPath = `/${groupName}/${pickedFile}`;
  const url = new URL(context.request.url);
  url.pathname = fullPath;
  return context.env.ASSETS.fetch(url);
}

const weightedRandom = (choices, weights) => {
  const n = choices.length;

  const opts = choices.map((x, i) => [weights[i], x]);
  const total = opts.reduce((acc, o) => acc + o[0], 0);

  const r = Math.floor(Math.random() * total);
  let sum = total;
  for (let i = 0; i < n; i++) {
    sum -= opts[i][0];
    if (sum <= r) {
      return opts[i][1];
    }
  }
};

const weightedRandomKey = (choices) => {
  const keys = Object.keys(choices);
  return weightedRandom(
    keys,
    keys.map((x) => choices[x])
  );
};
