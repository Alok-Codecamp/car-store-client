import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";

//https://car-store-express-app.vercel.app/api
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const BaseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOtions): Promise<any> => {
  let result = await baseQuery(args, api, extraOtions);

  if (result.error?.status === 500) {
    const res = await fetch("http://localhost:5000/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      console.log(user);
      api.dispatch(
        setUser({
          user,
          token: data?.data?.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOtions);
    } else {
      console.log(data);
      api.dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: BaseQueryWithRefreshToken,
  endpoints: () => ({}),
});
