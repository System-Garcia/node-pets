import jwt from "jsonwebtoken";

export class JwtGeneraton {

  constructor(private readonly jwtSeed: string) {}

  public async generateToken(payload: any, duration: string = "2h") {

    return new Promise((resolve) => {

      jwt.sign(payload, this.jwtSeed, { expiresIn: duration }, (err, token) => {

        if (err) return resolve(null);

        resolve(token);
      });
    });
  };

  public async validateToken<T>(token: string): Promise<T | null> {

    return new Promise( (resolve) => {

        jwt.verify(token, this.jwtSeed, (err, decoded) => {

            if(err) return resolve (null);

            resolve(decoded as T);
        });

    });

  }

}
