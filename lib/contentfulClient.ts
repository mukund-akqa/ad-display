import * as contentful from "contentful";

export const client = contentful.createClient({
  space: "j5cx25ta6ndu",
  accessToken: "83CX3uDv0-YTK-I3bS5B345NmEj_DWzJAwDm-0tbDNg",
});
// export const client = contentful.createClient({
//   space: process.env.CONTENTFUL_SPACE_ID,
//   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
// });
