import authReducer, {
  setCredentials,
  logOut,
  selectCurrentToken,
} from "./authSlice";

describe("authSlice reducer and selectors", () => {
  const initialState = { token: null };

  it("should return the initial state when passed an empty action", () => {
    const result = authReducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("should handle setCredentials action", () => {
    const accessToken = "test-token";
    const action = setCredentials({ accessToken });
    const result = authReducer(initialState, action);
    expect(result.token).toBe(accessToken);
  });

  it("should handle logOut action", () => {
    const loggedInState = { token: "some-token" };
    const action = logOut();
    const result = authReducer(loggedInState, action);
    expect(result.token).toBeNull();
  });

  it("selectCurrentToken selector returns token from state", () => {
    const state = { auth: { token: "abc123" } };
    expect(selectCurrentToken(state)).toBe("abc123");
  });

  it("selectCurrentToken returns null if no token", () => {
    const state = { auth: { token: null } };
    expect(selectCurrentToken(state)).toBeNull();
  });
});
