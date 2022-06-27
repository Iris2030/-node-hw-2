const { register, login } = require("./authController");
const authService = require("../services/authService");

describe("Auth Controller", () => {
  describe("Register", () => {
    test("new user should register with email", async () => {
      const next = jest.fn();

      authService.registUser = jest.fn(((data) => data));

      const req = {
        body: {
          email: "email@gmail.com",
          password: "abracadabra",
          subscription: "pro"
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      const result = await register(req, res, next);

      expect(result.code).toBe(201);
      expect(result.data.email).toBe("email@gmail.com");
      expect(result.data.subscription).toBe("pro");
      expect(result.data.password).toBeUndefined();

      expect(next).toBeCalledTimes(0);
    });
  });



  describe("Login", () => {
    test("user should login with correct creds", async () => {
      const next = jest.fn();

      const req = {
        body: {
          email: "email@gmail.com",
          password: "abracadabra",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      authService.loginUser = jest.fn(() => {
        return {
          token: "test jwt token",
        };
      });
      const result = await login(req, res, next);


      expect(result.code).toBe(200);
      expect(result.data.token).toBe("test jwt token");

      expect(next).toBeCalledTimes(0);
    });
  });
});
