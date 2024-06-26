import crypto from 'crypto';

class User {
  constructor(email, password, age) {
    this.id = crypto.randomUUID();
    this.email = email;
    this.password = password;
    this.age = age;
  }

  toJSON(password=false) {
    if (password) {
      return {
        id: this.id,
        email: this.email,
        password: this.password,
        age: this.age,
      }
    }
    return {
      id: this.id,
      email: this.email,
      age: this.age,
    };
  }
}

export default User;
