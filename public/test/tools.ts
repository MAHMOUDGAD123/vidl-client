/* eslint-disable @typescript-eslint/no-explicit-any */
// testing

export const logger = (
  location: { pathname: string },
  logs: [string, any][]
) => {
  console.log(
    `%c#${location.pathname.replace(/\//g, " -> ")}`,
    "color: orange;"
  );

  logs.forEach(([name, value]) => {
    console.log(`%c${name}`, "color: #00b3ff;");
    console.log(value);
  });
  console.log("===========================================\n");
};
