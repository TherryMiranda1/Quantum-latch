// deno-lint-ignore-file no-explicit-any
import latch from "./new-sdk/index.js";
import { environment } from "../../environment.ts";

latch.init({
  appId: environment.LATCH_APP_ID,
  secretKey: environment.LATCH_SECRET_KEY,
});

const pair = async (code: string, onSuccess: (data: string) => void) => {
  return await latch.pair(code, function (err: any, result: any) {
    if (err) {
      throw new Error(`Error pairing with latch  ${err}`);
    } else {
      onSuccess(result);
    }
  });
};

const getStatus = (accountId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    latch.operationStatus(
      accountId,
      environment.LATCH_OPERATION_ID,
      null,
      null,
      (err: any, result: any) => {
        if (err) {
          return reject(new Error(`Error pairing with latch: ${err}`));
        } else {
          return resolve(result.data);
        }
      }
    );
  });
};

export const latchService = { pair, getStatus };
