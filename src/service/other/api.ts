import request from "../../request";

import type { OpenAi } from "./interface";

export const postAsk = (): Promise<OpenAi> => {
  return request({
    method: "post",
    url: "",
  });
};
