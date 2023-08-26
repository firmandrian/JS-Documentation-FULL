import swaggerDocument1 from "../api-docs/getDataRoutes.json" assert { type: "json" };
import swaggerDocument2 from "../api-docs/postDataRoutes.json" assert { type: "json" };
import swaggerDocument3 from "../api-docs/updateDataRoutes.json" assert { type: "json" };
import swaggerDocument4 from "../api-docs/deleteDataRoutes.json" assert { type: "json" };

const margedPaths = {
  ...swaggerDocument1.paths,
  ...swaggerDocument2.paths,
  ...swaggerDocument3.paths,
  ...swaggerDocument4.paths,
};

//merge all the JSON files to import in the server.js file
export const mergedSwaggerDocument = {
  ...swaggerDocument1,
  ...swaggerDocument2,
  ...swaggerDocument3,
  ...swaggerDocument4,
  paths: margedPaths,
};
